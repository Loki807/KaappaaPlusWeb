export interface UserDto {
  id: string;            // GUID from backend
  tenantId: string;      // which tenant this user belongs to
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  roles: string[];       // e.g., ["Police"] or ["TenantAdmin"]
}