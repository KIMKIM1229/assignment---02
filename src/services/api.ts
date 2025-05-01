const BASE_URL = 'https://dae-mobile-assignment.hkit.cc';
const API_PATH = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const url = new URL(`${BASE_URL}${API_PATH}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const token = localStorage.getItem('token');
      const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      console.log('Requesting:', url.toString());

      const response = await fetch(url.toString(), {
        ...options,
        headers,
        mode: 'cors',
        credentials: 'omit',
      });

      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        throw new ApiError(response.status, await response.text());
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, '網路錯誤，請稍後再試');
    }
  },

  // 瑜伽動作相關 API
  yoga: {
    async getList(params?: Record<string, any>) {
      return api.request('/yoga-actions', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }, {
        page: params?.page || 1,
        limit: params?.limit || 5,
        ...params
      });
    },

    async getCategories() {
      try {
        const response = await fetch(`${BASE_URL}${API_PATH}/yoga-poses/categories`);
        if (!response.ok) throw new Error('無法獲取分類');
        return await response.json();
      } catch (error) {
        console.error('獲取分類時出錯:', error);
        throw error;
      }
    }
  },

  // 認證相關 API
  auth: {
    async login(username: string, password: string) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    },

    async register(username: string, password: string) {
      return api.request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
    },

    async checkStatus() {
      return api.request('/auth/check', {
        method: 'GET',
      });
    },
  },

  // 收藏相關 API
  bookmarks: {
    async getAll() {
      return api.request('/bookmarks', {
        method: 'GET',
      });
    },

    async add(itemId: number) {
      return api.request(`/bookmarks/${itemId}`, {
        method: 'POST',
      });
    },

    async remove(itemId: number) {
      return api.request(`/bookmarks/${itemId}`, {
        method: 'DELETE',
      });
    },
  },
}; 