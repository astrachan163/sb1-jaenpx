import axios from 'axios';
import axiosRetry from 'axios-retry';

export interface AgentQLParams {
  wait_for?: number;
  is_scroll_to_bottom_enabled?: boolean;
  mode?: 'standard' | 'fast';
  is_screenshot_enabled?: boolean;
}

export interface AgentQLRequest {
  query: string;
  url: string;
  params?: AgentQLParams;
}

export interface AgentQLResponse<T = any> {
  data: T;
  metadata: {
    request_id: string;
    screenshot?: string;
  };
}

export class AgentQLClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly client: typeof axios;

  constructor(
    apiKey: string,
    baseUrl = 'https://api.agentql.com/v1/query-data'
  ) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    
    this.client = axios.create({
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    axiosRetry(this.client, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: error => 
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        error.code === 'ECONNABORTED'
    });
  }

  async queryData<T = any>(request: AgentQLRequest): Promise<AgentQLResponse<T>> {
    try {
      const response = await this.client.post<AgentQLResponse<T>>(
        this.baseUrl,
        {
          ...request,
          params: {
            wait_for: 5,
            is_scroll_to_bottom_enabled: true,
            mode: 'standard',
            is_screenshot_enabled: false,
            ...request.params
          }
        },
        {
          headers: {
            'X-API-Key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `AgentQL API error: ${error.response?.status} - ${
            error.response?.data?.error || error.message
          }`
        );
      }
      throw error;
    }
  }

  async batchQuery<T = any>(
    requests: AgentQLRequest[]
  ): Promise<AgentQLResponse<T>[]> {
    const results: AgentQLResponse<T>[] = [];
    
    for (const request of requests) {
      try {
        const result = await this.queryData<T>(request);
        results.push(result);
        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to process request for ${request.url}:`, error);
      }
    }

    return results;
  }
}