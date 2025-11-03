export interface LoginResponse {
  token: string;
  name: string;
  role: string;
  message?: string;
  requirePasswordChange?: boolean;
}
