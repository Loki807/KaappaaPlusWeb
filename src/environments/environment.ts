export const environment = {
production: false,
// Base API URL (no trailing slash)
apiBase: 'https://localhost:7055/api',
// Centralized endpoints so you don't hardcode paths elsewhere
endpoints: {
admin: {
tenant: {
create: 'admin/tenant/create', // → https://localhost:7055/api/admin/tenant/create
all: 'admin/tenant/all'
}
}
}
};
