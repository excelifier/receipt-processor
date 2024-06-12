import config from "./env";
import {JobItem, OriginalFileResponse } from "./types";
import { downloadOriginalFile } from "./getOriginalFile";

const mergeJobs = async (jobItems: JobItem[]): Promise<void> => {
  // Extract the uuids from the jobItems array
  const jobUuids = jobItems.map(jobItem => jobItem.uuid);

  const response = await fetch(`${config.apiHost}/merge`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.bearerToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobs: jobUuids })  // Include the uuids in the request body
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.error('Error response:', errorResponse);
    throw new Error('Failed to fetch merge results');
  }

  const data: OriginalFileResponse = await response.json();
  const filename = `${config.createdFrom}-${config.createdTo}.xlsx`;

  // Call downloadOriginalFile with the OriginalFileResponse and filename
  await downloadOriginalFile(data, filename);
};

export default mergeJobs;