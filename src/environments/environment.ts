// src/environments/environment.ts
export const environment = {
  production: false,
  apiBase: 'https://localhost:7055/api',
  endpoints: {
    admin: {
      tenant: {
        create: 'admin/tenant/create',
        all: 'admin/tenant/all',
        byId: (id: string) => `admin/tenant/${id}`,
        update: (id: string) => `admin/tenant/${id}`,
        delete: (id: string) => `admin/tenant/${id}`,
      },

      // ✅ put tenant-user endpoints here (matches your controller)
      tenantUser: {
        // POST /api/admin/tenant/user/create
        create: 'admin/tenant/user/create',

        // GET /api/admin/tenant/user/all/{tenantId}
        allByTenant: (tenantId: string) => `admin/tenant/user/all/${tenantId}`,

        // GET /api/admin/tenant/user/{id}
        byId: (id: string) => `admin/tenant/user/${id}`,

        // PUT /api/admin/tenant/user/update/{id}
        update: (id: string) => `admin/tenant/user/update/${id}`,

        // DELETE /api/admin/tenant/user/delete/{id}
        delete: (id: string) => `admin/tenant/user/delete/${id}`,
      },
    },

    // (Optional) keep tenant.* if you have separate tenant-scoped routes later
    tenant: {
      // leave empty or add tenant-side routes here if you really have them
    },
  },
};
