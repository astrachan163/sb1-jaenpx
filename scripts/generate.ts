import { ContentGenerator } from '../src/utils/contentGenerator';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    console.log('Starting content generation...');
    
    const generator = new ContentGenerator();
    const weekNumber = 5; // Change this as needed

    // Generate infographics for key topics
    const topics = [
      'Loss Prevention Techniques',
      'Workplace Safety Practices',
      'Ethical Decision-Making in Retail',
      'Retail Career Development'
    ];

    console.log('Generating infographics...');
    const infographics = await Promise.all(
      topics.map(topic => generator.generateInfographic(weekNumber, topic))
    );

    // Generate additional weekly content
    console.log('Generating weekly content...');
    const weeklyContent = await generator.generateWeeklyContent(weekNumber);

    // Combine all generated content
    const allContent = [...infographics, ...weeklyContent];

    // Save generated content
    const outputPath = path.join(__dirname, `../src/data/generated-content-week${weekNumber}.json`);
    await writeFile(outputPath, JSON.stringify(allContent, null, 2));
    
    console.log(`Generated ${allContent.length} content items successfully!`);
    console.log(`Data saved to ${outputPath}`);

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();