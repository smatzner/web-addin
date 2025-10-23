import { Injectable, computed, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MetadataContainerDto } from '../domain/metadata'
import { firstValueFrom } from 'rxjs'
import { Role } from '../domain/role'

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private readonly endpoint = 'http://localhost:8055/RWDBWebService/GetMetadata'

  readonly loading = signal<boolean>(false)
  readonly error = signal<string | null>(null)
  private readonly metadataDto = signal<MetadataContainerDto | null>(null)

  readonly roles = computed<Role[]>(() => {
    const dto = this.metadataDto()
    if (!dto?.Roles) return []
    return dto.Roles.map(this.mapServerRole)
  })

  constructor(private readonly http: HttpClient) {}

  async load(force = false): Promise<void> {
    if (!force && this.metadataDto()) return
    this.loading.set(true)
    this.error.set(null)
    try {
      const dto = await firstValueFrom(
        this.http.get<MetadataContainerDto>(this.endpoint, { withCredentials: false })
      )
      this.metadataDto.set(dto ?? null)
    } catch (err: any) {
      this.error.set(err?.message ?? 'Failed to load metadata')
      this.metadataDto.set(null)
    } finally {
      this.loading.set(false)
    }
  }

  private readonly mapServerRole = (r: any): Role => {
    // Be tolerant of different server casings/shape
    const id = r?.id ?? r?.Id ?? r?.roleId ?? r?.RoleId
    const name = r?.name ?? r?.Name ?? r?.fullName ?? r?.FullName ?? r?.description ?? r?.Description
    return { id: Number(id ?? 0), name: String(name ?? '') }
  }
}
