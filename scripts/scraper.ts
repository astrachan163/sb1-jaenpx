import { AgentQLClient } from '../src/utils/agentql';
import { retailQueries } from '../src/utils/queries';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { AGENTQL_API_KEY } from '../src/config/api';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    console.log('Starting content scraping...');
    
    const client = new AgentQLClient(AGENTQL_API_KEY);
    const sources = [
      {
        url: 'https://www.retailcouncil.org/resources',
        query: retailQueries.resources
      },
      {
        url: 'https://retail.fandom.com/wiki/Retail',
        query: retailQueries.articles
      }
    ];

    const results = await client.batchQuery(sources);
    let resources = [];

    if (results.length > 0) {
      resources = results.flatMap((result, index) => {
        const data = result.data;
        const items = [...(data.articles || []), ...(data.resources || [])];
        
        return items.map(item => ({
          title: item.title || 'Retail Resource',
          type: item.type || 'article',
          url: item.link || sources[index].url,
          description: item.summary || item.description || item.content?.slice(0, 200) || 'No description available',
          keyTakeaways: [
            'Understanding retail fundamentals',
            'Customer service best practices',
            'Industry trends and insights'
          ],
          duration: '10 min read',
          discussionQuestions: [
            'How can these concepts be applied in practice?',
            'What are the key challenges in implementation?'
          ],
          practicalApplications: [
            'Implementing customer service strategies',
            'Improving retail operations'
          ]
        }));
      });
    }

    if (resources.length === 0) {
      console.warn('No resources were scraped. Using fallback data...');
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