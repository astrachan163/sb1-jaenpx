import axios from 'axios';
import axiosRetry from 'axios-retry';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AGENTQL_API_KEY, AGENTQL_API_URL, SCRAPING_SOURCES } from '../src/config/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure axios with retries
const client = axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

axiosRetry(client, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.code === 'ECONNABORTED';
  }
});

const retailQueries = {
  wikiContent: `{
    content: text(selector: ".mw-parser-output p"),
    sections[] {
      title: text(selector: "h2"),
      content: text(selector: "p")
    }
  }`,

  blogPosts: `{
    posts[] {
      title: text(selector: ".post-title, h2.title"),
      excerpt: text(selector: ".post-excerpt, .summary"),
      content: text(selector: ".post-content, .entry-content"),
      date: text(selector: ".post-date, .date")
    }
  }`,

  resources: `{
    resources[] {
      title: text(selector: ".resource-title, h3"),
      description: text(selector: ".resource-description, .summary"),
      link: attr(selector: "a.resource-link", name: "href")
    }
  }`
};

const sources = [
  {
    url: SCRAPING_SOURCES.RETAIL_WIKI,
    query: retailQueries.wikiContent
  },
  {
    url: SCRAPING_SOURCES.NRF_BLOG,
    query: retailQueries.blogPosts
  },
  {
    url: SCRAPING_SOURCES.RETAIL_COUNCIL,
    query: retailQueries.resources
  }
];

async function queryData(request) {
  try {
    console.log(`Querying ${request.url}...`);
    
    const response = await client.post(
      AGENTQL_API_URL,
      {
        ...request,
        params: {
          wait_for: 5,
          is_scroll_to_bottom_enabled: true,
          mode: 'standard',
          is_screenshot_enabled: false
        }
      },
      {
        headers: {
          'X-API-Key': AGENTQL_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.data) {
      throw new Error('Invalid response format');
    }

    console.log(`Successfully queried ${request.url}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to query ${request.url}:`, error.message);
    return null;
  }
}

async function batchQuery(requests) {
  const results = [];
  
  for (const request of requests) {
    try {
      const result = await queryData(request);
      if (result?.data) {
        results.push(result);
      }
      // Respect rate limits
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error(`Failed to process request for ${request.url}:`, error);
    }
  }

  return results;
}

function processScrapedData(data, sourceUrl) {
  const resources = [];

  for (const key in data) {
    const items = Array.isArray(data[key]) ? data[key] : [data[key]];
    items.forEach(item => {
      if (item.title || item.content) {
        resources.push({
          title: (item.title || 'Retail Resource').trim(),
          type: determineResourceType(item),
          url: item.link || sourceUrl,
          description: extractDescription(item),
          keyTakeaways: extractKeyPoints(item),
          duration: estimateReadingTime(item),
          discussionQuestions: generateDiscussionQuestions(item),
          practicalApplications: extractPracticalApplications(item)
        });
      }
    });
  }

  return resources;
}

function determineResourceType(item) {
  if (item.type?.toLowerCase().includes('video')) return 'video';
  if (item.type?.toLowerCase().includes('pdf') || item.type?.toLowerCase().includes('document')) return 'document';
  if (item.link || item.url) return 'link';
  return 'article';
}

function extractDescription(item) {
  return (
    item.description ||
    item.excerpt ||
    item.content?.slice(0, 200) ||
    'No description available'
  ).trim();
}

function extractKeyPoints(item) {
  const content = item.content || item.description || '';
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
  return sentences.slice(0, 3).map(s => s.trim());
}

function estimateReadingTime(item) {
  const content = item.content || item.description || '';
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return `${Math.ceil(words / wordsPerMinute)} min read`;
}

function generateDiscussionQuestions(item) {
  const content = item.content || item.description || '';
  const topics = content.split(/[.!?]+/).filter(s => 
    s.includes('how') || s.includes('why')
  );
  return topics.slice(0, 2).map(t => `${t.trim()}?`);
}

function extractPracticalApplications(item) {
  const content = item.content || item.description || '';
  const applications = content
    .split(/[.!?]+/)
    .filter(s => s.includes('can') || s.includes('should') || s.includes('will'))
    .map(s => s.trim());
  return applications.slice(0, 2);
}

async function main() {
  try {
    console.log('Starting content scraping...');
    
    const results = await batchQuery(sources);
    const resources = results.flatMap((result, index) => 
      processScrapedData(result.data, sources[index].url)
    );

    if (resources.length === 0) {
      console.warn('No resources were scraped. Using fallback data...');
      // Add some fallback data
      resources.push({
        title: "Retail Industry Overview",
        type: "article",
        url: "https://retail.fandom.com/wiki/Retail",
        description: "Comprehensive overview of retail industry fundamentals and best practices",
        keyTakeaways: [
          "Understanding retail channels",
          "Customer service essentials",
          "Industry trends"
        ],
        duration: "15 min read",
        discussionQuestions: [
          "How is retail evolving in the digital age?",
          "What makes excellent customer service?"
        ],
        practicalApplications: [
          "Implementing omnichannel strategies",
          "Improving customer experience"
        ]
      });
    }

    // Save scraped data
    const outputPath = path.join(__dirname, '../src/data/scraped-resources.json');
    await writeFile(outputPath, JSON.stringify(resources, null, 2));
    
    console.log(`Scraped ${resources.length} resources successfully!`);
    console.log(`Data saved to ${outputPath}`);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();