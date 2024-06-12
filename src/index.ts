import dotenv from 'dotenv';
import fse from 'fs-extra';
import fetchJobs from './fetchJobs.js';
import getOriginalFile from './getOriginalFile.js';
import mergeJobs from './mergeJobs.js';
import { JobItem } from './types.js';


// Load environment variables
dotenv.config();
const DIR_IN = process.env.DIR_IN!;

const startProcessing = async () => {
    await fse.ensureDir(DIR_IN);
  
    let receipts: JobItem[] = [];
    
    try {
      console.log('Starting processing receipts and results fetching...');
      
      const fetchedReceipts = await fetchJobs();
      receipts = fetchedReceipts; // Store the fetched receipts in the receipts variable
      const uuids = receipts.map(receipt => receipt.uuid);
      console.log(uuids); // For debugging purposes
    
      // Download the original file for each receipt
      const downloadPromises = receipts.map(receipt => getOriginalFile(receipt));
    
      // Wait for all downloads to complete
      const downloadStatuses = await Promise.all(downloadPromises);
      console.log(downloadStatuses); // For debugging purposes
  
    } catch (error) {
      console.error('Error fetching receipts or downloading files:', error);
    }
    
    try {
      // Filter out unsuccessful jobs
      const successfulReceipts = receipts.filter(receipt => receipt.success);
    
      if (successfulReceipts.length === 0) {
        console.log('No successful jobs to process.');
        return;
      }
      // Call mergeJobs with the successful receipts
      await mergeJobs(successfulReceipts);
    } catch (error) {
      console.error('An error occurred while merging jobs:', error);
    }
  };
  
  // Start the processing
  startProcessing();
