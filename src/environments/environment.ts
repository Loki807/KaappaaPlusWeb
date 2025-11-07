// src/environments/environment.ts
export const environment = {
  production: false,
  apiBase: 'https://localhost:7055/api',
  endpoints: {
    admin: {
      // ✅ this group is for admin-side user mgmt
      users: {
        create: 'admin/users/create',   // <-- YOUR ACTUAL PATH
        // (optional) add more later: all, byId, update, delete
      },
      tenant: {
        create: 'admin/tenant/create',
        all: 'admin/tenant/all',
        byId: (id: string) => `admin/tenant/${id}`,
        update: (id: string) => `admin/tenant/${id}`,
        delete: (id: string) => `admin/tenant/${id}`,
      }
    },
    tenant: {
      users: {
        all: 'tenant/users/all',
        byId: (id: string) => `tenant/users/${id}`,
        update: (id: string) => `tenant/users/${id}`,
        delete: (id: string) => `tenant/users/${id}`,
      }
    }
  }
};

