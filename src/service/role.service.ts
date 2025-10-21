import { Injectable } from '@angular/core';
import {Role} from '../domain/role'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getRoleData() : Role[] {
    return [
      { id: 1, name: 'Außer Kraft' },
      { id: 2, name: 'Betrieblicher Wagendienst' },
      { id: 3, name: 'Betriebsassistent' },
      { id: 4, name: 'Betriebskoordination' },
      { id: 5, name: 'Betriebskoordinator' },
    ];
  }
}
