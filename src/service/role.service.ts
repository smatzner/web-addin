import { Injectable, computed, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { Role } from '../domain/role'

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly endpoint = 'http://localhost:5184/api/webaddin/GetAllRoles'

  private readonly rolesSignal = signal<Role[]>([])
  readonly roles = computed<Role[]>(() => this.rolesSignal())

  readonly loading = signal<boolean>(false)
  readonly error = signal<string | null>(null)

  constructor(private readonly http: HttpClient) {}

  async load(force = false): Promise<void> {
    if (!force && this.rolesSignal().length) return

    this.loading.set(true)
    this.error.set(null)

    try {
      const roles = await firstValueFrom(
        this.http.get<Role[]>(this.endpoint, { withCredentials: false })
      )
      this.rolesSignal.set(Array.isArray(roles) ? roles : [])
    } catch (err: any) {
      this.error.set(err?.message ?? 'Failed to load roles')
      this.rolesSignal.set([])
    } finally {
      this.loading.set(false)
    }
  }
}
