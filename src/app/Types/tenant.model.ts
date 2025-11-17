import { SafeResourceUrl } from "@angular/platform-browser";

export interface Tenant {
  id: string;
  name: string;
  code: string;
  city: string;
  stateOrDistrict: string;
  postalCode: string;
  contactNumber: string;
 serviceType:string;
  email: string;
  role: string;
  status: string;
  addressLine1:string;
  addressLine2:string;
  logoUrl:string;
}