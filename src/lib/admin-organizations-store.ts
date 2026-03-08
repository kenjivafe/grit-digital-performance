export type AdminOrganizationRecord = {
  id: string
  name: string
  type: 'League' | 'School' | 'Club'
  contactPerson: string
  email: string
  phone: string
  totalEventsHosted: number
  logoUrl?: string
  createdAt: string
}

const STORAGE_KEY = 'grit_admin_organizations_v1'

const defaultOrganizations: AdminOrganizationRecord[] = [
  {
    id: 'org_1',
    name: 'Denver Soccer Academy',
    type: 'Club',
    contactPerson: 'John Smith',
    email: 'info@denversoccer.com',
    phone: '(303) 555-0123',
    totalEventsHosted: 12,
    createdAt: '2024-01-15',
  },
  {
    id: 'org_2',
    name: 'Colorado Sports League',
    type: 'League',
    contactPerson: 'Sarah Johnson',
    email: 'admin@cosportsleague.com',
    phone: '(720) 555-0456',
    totalEventsHosted: 8,
    createdAt: '2024-02-20',
  },
  {
    id: 'org_3',
    name: 'Elite Athletes Academy',
    type: 'School',
    contactPerson: 'Mike Davis',
    email: 'contact@eliteathletes.com',
    phone: '(303) 555-0789',
    totalEventsHosted: 5,
    createdAt: '2024-03-10',
  },
]

function safeParse(json: string): AdminOrganizationRecord[] | null {
  try {
    const value = JSON.parse(json)
    if (!Array.isArray(value)) return null
    return value as AdminOrganizationRecord[]
  } catch {
    return null
  }
}

export function getAdminOrganizations(): AdminOrganizationRecord[] {
  if (typeof window === 'undefined') return defaultOrganizations
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultOrganizations
  return safeParse(raw) ?? defaultOrganizations
}

export function setAdminOrganizations(orgs: AdminOrganizationRecord[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orgs))
}

export function getAdminOrganizationById(id: string): AdminOrganizationRecord | null {
  return getAdminOrganizations().find((o) => o.id === id) ?? null
}

export function upsertAdminOrganization(org: AdminOrganizationRecord) {
  const orgs = getAdminOrganizations()
  const idx = orgs.findIndex((o) => o.id === org.id)
  const next = [...orgs]
  if (idx === -1) next.unshift(org)
  else next[idx] = org
  setAdminOrganizations(next)
  return next
}

export function deleteAdminOrganization(id: string) {
  const next = getAdminOrganizations().filter((o) => o.id !== id)
  setAdminOrganizations(next)
  return next
}
