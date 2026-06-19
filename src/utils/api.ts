const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Employees ──────────────────────────────────────────────────────────────────

export interface ApiEmployee {
  _id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  dailyRate: number;
  status: "Active" | "Inactive";
  avatarUrl?: string;
  initials?: string;
}

export const employeeApi = {
  list: (params?: { status?: string; department?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<ApiEmployee[]>(`/api/employees${qs ? "?" + qs : ""}`);
  },
  get:    (id: string)                          => request<ApiEmployee>(`/api/employees/${id}`),
  create: (body: Omit<ApiEmployee, "_id">)      => request<ApiEmployee>("/api/employees", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<ApiEmployee>) => request<ApiEmployee>(`/api/employees/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id: string)                          => request<{ message: string }>(`/api/employees/${id}`, { method: "DELETE" }),
};

// ── Attendance ─────────────────────────────────────────────────────────────────

export interface AttendanceEntry {
  employeeId: string;
  name: string;
  department: string;
  status: "Present" | "Half-day" | "Absent" | "On Leave";
  hoursWorked: number;
  dailyRate: number;
}

export interface AttendanceRecord {
  _id: string;
  date: string;
  committed: boolean;
  entries: AttendanceEntry[];
}

export const attendanceApi = {
  list:   (from?: string, to?: string) => {
    const qs = new URLSearchParams({ ...(from && { from }), ...(to && { to }) }).toString();
    return request<AttendanceRecord[]>(`/api/attendance${qs ? "?" + qs : ""}`);
  },
  get:    (date: string)                              => request<AttendanceRecord>(`/api/attendance/${date}`),
  save:   (date: string, body: Partial<AttendanceRecord>) => request<AttendanceRecord>(`/api/attendance/${date}`, { method: "PUT", body: JSON.stringify(body) }),
  commit: (date: string)                              => request<AttendanceRecord>(`/api/attendance/${date}/commit`, { method: "PATCH" }),
};

// ── Payroll ────────────────────────────────────────────────────────────────────

export interface PayrollEntryStatus {
  period: string;
  entryId: string;
  status: "Pending" | "Approved" | "On Hold" | "Released";
}

export const payrollApi = {
  list:         ()                              => request<unknown[]>("/api/payroll"),
  get:          (period: string)                => request<unknown>(`/api/payroll/${encodeURIComponent(period)}`),
  save:         (period: string, body: unknown) => request<unknown>(`/api/payroll/${encodeURIComponent(period)}`, { method: "PUT", body: JSON.stringify(body) }),
  updateStatus: (period: string, entryId: string, status: string) =>
    request<unknown>(`/api/payroll/${encodeURIComponent(period)}/entries/${entryId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
