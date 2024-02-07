export interface FetchOptions extends RequestInit {
  retries?: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
