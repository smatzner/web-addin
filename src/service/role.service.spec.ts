import { TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withFetch } from '@angular/common/http'

import { RoleService } from './role.service'

describe('RoleService', () => {
  let service: RoleService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    })
    service = TestBed.inject(RoleService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('loads and maps roles from the backend', async () => {
    const loadPromise = service.load(true)

    const req = httpMock.expectOne('http://localhost:5184/api/webaddin/GetAllRoles')
    expect(req.request.method).toBe('GET')

    req.flush([
      {
        id: 7,
        name: 'Inspector',
        description: 'Handles inspections',
        isActive: true,
        dateCreated: '2024-01-10T10:00:00Z',
        createdBy: 'system',
        dateModified: '2024-01-11T10:00:00Z',
        modifiedBy: 'system',
        type: 1,
        override: false,
        color: 12,
      },
    ])

    await loadPromise

    expect(service.roles()).toEqual([
      {
        id: 7,
        name: 'Inspector',
        description: 'Handles inspections',
        isActive: true,
        dateCreated: '2024-01-10T10:00:00Z',
        createdBy: 'system',
        dateModified: '2024-01-11T10:00:00Z',
        modifiedBy: 'system',
        type: 1,
        override: false,
        color: 12,
      },
    ])
  })
})
