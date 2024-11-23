import axios from 'axios';
import { parentPort } from 'worker_threads';
import { AGENTQL_API_KEY, AGENTQL_API_URL } from '../src/config/api.js';

parentPort.on('message', async ({ source, retryCount = 0 }) => {
  try {
    const response = await axios.post(
      AGENTQL_API_URL,
      {
        query: source.query,
        url: source.url,
        params: {
          wait_for: 5,
          is_scroll_to_bottom_enabled: true,
          mode: "standard",
          is_screenshot_enabled: false
        }
      },
      {
        headers: {
          'X-API-Key': AGENTQL_API_KEY,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (!response.data?.data) {
      throw new Error('Invalid response format from AgentQL API');
    }

    parentPort.postMessage({ success: true, data: response.data.data });
  } catch (error) {
    if (retryCount < 3) {
      parentPort.postMessage({ retry: true, source, retryCount: retryCount + 1 });
    } else {
      parentPort.postMessage({ 
        success: false, 
        error: error.message,
        source: source.url 
      });
    }
  }
});