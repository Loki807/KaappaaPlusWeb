export interface LoginResponse {
  tenantId: any;
  tenantName(arg0: string, tenantName: any): unknown;
  token: string;
  name: string;
  role: string;
  message?: string;
  requirePasswordChange?: boolean;
}
