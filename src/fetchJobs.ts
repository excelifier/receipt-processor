import config from "./env";
import {JobItem} from "./types";


  const fetchJobs = async (): Promise<JobItem[]> => {

    const createdFromStr = config.createdFrom
    const createdToStr = config.createdTo
  
    const url = `${config.apiHost}/job?created_from=${createdFromStr}&created_to=${createdToStr}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error('Failed to fetch receipts');
      }
    
      const data: JobItem[] = await response.json();
      return data;
    };


  export default fetchJobs