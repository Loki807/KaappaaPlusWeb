export const environment = {
  production: false,
  apiBase: 'https://localhost:7055/api',
  endpoints: {
    admin: {
      tenantUser: {
        create: 'admin/tenant/user/create'   // <-- your backend path
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

