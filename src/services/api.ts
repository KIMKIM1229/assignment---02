const BASE_URL = 'https://dae-mobile-assignment.hkit.cc/api';

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
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new ApiError(response.status, await response.text());
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, '網路錯誤，請稍後再試');
    }
  },

  // 瑜伽動作相關 API
  yoga: {
    async getList(params?: Record<string, string>) {
      return api.request('/yoga-actions', {
        method: 'GET',
      }, params);
    },
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