export enum RoleType {
  Mitarbeiter = 1,
  Baustein = 2,
  BetriebsformArten = 4,
}

export interface Role {
  id: number
  name: string
  description?: string
  isActive?: boolean
  dateCreated?: string
  createdBy?: string
  dateModified?: string
  modifiedBy?: string
  type?: RoleType
  override?: boolean
  color?: number
}
