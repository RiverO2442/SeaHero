const STORE_KEY = "seahero_employees";

export interface StoredEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  avatarUrl?: string;
  initials?: string;
  dailyRate: number;
  role: string;
  status: "Active" | "Inactive";
}

export function getStoredEmployees(): StoredEmployee[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as StoredEmployee[]) : [];
  } catch {
    return [];
  }
}

export function setStoredEmployees(employees: StoredEmployee[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(employees));
}

export function mergeStoredEmployees(incoming: StoredEmployee[]) {
  const existing = getStoredEmployees();
  const byId = new Map(existing.map((e) => [e.id, e]));
  for (const emp of incoming) {
    byId.set(emp.id, { ...byId.get(emp.id), ...emp });
  }
  setStoredEmployees(Array.from(byId.values()));
}
