import { Injectable } from '@angular/core';
import {Role} from '../domain/role'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getRoleData() : Role[] {
    return [
      { id: 1, name: 'Außer Kraft', color: '#000' },
      { id: 2, name: 'Betrieblicher Wagendienst', color: '#000' },
      { id: 3, name: 'Betriebsassistent', color: '#000' },
      { id: 4, name: 'Betriebskoordination', color: '#000' },
      { id: 5, name: 'Betriebskoordinator', color: '#000' },
    ];
  }
}
