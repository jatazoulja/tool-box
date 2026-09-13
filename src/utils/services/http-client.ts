import { GLOBAL_CONFIG } from '@/config/global-config';

export interface HttpRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = GLOBAL_CONFIG.API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    params?: HttpRequestOptions['params'],
  ): string {
    const url = new URL(
      endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`,
    );
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async get<T>(endpoint: string, options?: HttpRequestOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP GET ${endpoint} failed with status ${response.status}`,
      );
    }

    return response.json();
  }

  async post<T, B = unknown>(
    endpoint: string,
    body: B,
    options?: HttpRequestOptions,
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options?.params);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `HTTP POST ${endpoint} failed with status ${response.status}`,
      );
    }

    return response.json();
  }
}

export const httpClient = new HttpClient();
