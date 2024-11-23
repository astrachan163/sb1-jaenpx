import { scheduleJob } from 'node-schedule';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Run weekly on Sunday at 1 AM
scheduleJob('0 1 * * 0', async () => {
  try {
    console.log('Starting weekly content update...');
    
    // Backup current content
    const backupDir = path.join(__dirname, '../backups', new Date().toISOString());
    await fs.mkdir(backupDir, { recursive: true });
    
    const contentDir = path.join(__dirname, '../src/data/weeks');
    const files = await fs.readdir(contentDir);
    
    for (const file of files) {
      const content = await fs.readFile(path.join(contentDir, file));
      await fs.writeFile(path.join(backupDir, file), content);
    }
    
    // Run scraper with retries
    let retries = 3;
    let success = false;
    
    while (retries > 0 && !success) {
      try {
        await new Promise((resolve, reject) => {
          exec('npm run scrape', (error, stdout, stderr) => {
            if (error) {
              reject(error);
            } else {
              console.log(stdout);
              resolve();
            }
          });
        });
        success = true;
      } catch (error) {
        console.error(`Scrape attempt failed, ${retries - 1} retries remaining`);
        retries--;
        if (retries === 0) throw error;
        // Wait 5 minutes before retrying
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
      }
    }
    
    console.log('Weekly content update completed successfully');
    
  } catch (error) {
    console.error('Error during weekly update:', error);
    // Restore from backup if update failed
    const lastBackup = (await fs.readdir(path.join(__dirname, '../backups')))
      .sort()
      .pop();
      
    if (lastBackup) {
      const backupFiles = await fs.readdir(path.join(__dirname, '../backups', lastBackup));
      for (const file of backupFiles) {
        const content = await fs.readFile(path.join(__dirname, '../backups', lastBackup, file));
        await fs.writeFile(path.join(__dirname, '../src/data/weeks', file), content);
      }
      console.log('Restored content from last backup');
    }
  }
});