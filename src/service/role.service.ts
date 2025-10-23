import { Injectable, computed } from '@angular/core'
import { Role } from '../domain/role'
import { MetadataService } from './metadata.service'

@Injectable({ providedIn: 'root' })
export class RoleService {
  readonly roles = computed<Role[]>(() => this.metadata.roles())

  constructor(private readonly metadata: MetadataService) {}

  async load(): Promise<void> {
    await this.metadata.load()
  }
}
