// API 回應的類型定義
export interface YogaAction {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  difficulty: string;
  duration: string;
  benefits: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface ListResponse {
  items: YogaAction[];
  pagination: Pagination;
}

export interface AuthResponse {
  user_id: number;
  token: string;
}

export interface BookmarkResponse {
  message: 'newly bookmarked' | 'already bookmarked' | 'newly deleted' | 'already deleted';
}

export interface BookmarksResponse {
  item_ids: number[];
}

// API 請求參數類型
export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface User {
  id: number;
  username: string;
} 