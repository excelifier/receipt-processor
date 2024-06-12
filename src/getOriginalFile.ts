import config from "./env";
import path from "path";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { Readable } from 'stream';
import {JobItem, OriginalFileResponse} from "./types";


const getOriginalFileResponse = async (jobItem:JobItem): Promise<OriginalFileResponse> => {
    const response = await fetch(`${config.apiHost}/job/${jobItem.uuid}/file`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${config.bearerToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch receipts');
    }

    const data = await response.json() as OriginalFileResponse;
    return data;
};

export const downloadOriginalFile = async (originalFileResponse: OriginalFileResponse, filename: string): Promise<string> => {
  const response = await fetch(originalFileResponse.download_url, {
      method: 'GET'
  });

  if (!response.ok) {
      throw new Error('Failed to download original');
  }

  if (response.body) {
    // Convert the ReadableStream to a Readable
    const readable = Readable.from(response.body);

    // Save the downloaded file to disk
    await saveResultToFile(originalFileResponse.download_url, filename, readable);
  } else {
      throw new Error('Response body is null');
  }

  return response.status === 200 ? 'Success' : 'Failure';
};

const saveResultToFile = async (
  uuid: string,
  filename: string,
  data: Readable
): Promise<void> => {
  const filePath = path.join(config.dirIn, `${filename}`);
  try {
    const fileStream = fs.createWriteStream(filePath);
    await promisify(pipeline)(data, fileStream);
    console.log(`Saved result for ${uuid} as ${filePath}`);
  } catch (error) {
    console.error(`Error saving result for ${uuid}:`, error);
  }
};

const getOriginalFile = async (jobItem:JobItem): Promise<string> => {
  const originalFileResponse = await getOriginalFileResponse(jobItem);
  const downloadStatus = await downloadOriginalFile(originalFileResponse, jobItem.filename);
  //for each file returned by download original fileFrom, call saveResultToFile

  return downloadStatus;
}

export default getOriginalFile;