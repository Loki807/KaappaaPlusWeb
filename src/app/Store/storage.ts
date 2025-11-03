import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Storage {



  setToken(token: string) { localStorage.setItem('kaappaan_token', token); }


  getToken() { return localStorage.getItem('kaappaan_token'); }

  
  clear() { localStorage.clear(); }
}
