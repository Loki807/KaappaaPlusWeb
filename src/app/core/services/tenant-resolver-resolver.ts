import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { Tenant } from '../../Types/tenant.model';
import { EMPTY, catchError } from 'rxjs';

export const tenantResolver: ResolveFn<Tenant[]> = (route, state) => {

  const service = inject(TenantService);
  const router = inject(Router);

  return service.getAllTenants().pipe(
    catchError(err => {
      router.navigateByUrl('/error');  // optional
      return EMPTY;
    })
  );
};
