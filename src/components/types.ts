export type AttendanceStatus = "Present" | "Half-day" | "Absent" | "On Leave";

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  avatarUrl?: string;
  initials?: string;
  status: AttendanceStatus;
  hoursWorked: number;
  dailyRate: number;
}

export interface Adjustment {
  id: string;
  type: "overtime" | "correction" | "other";
  title: string;
  detail: string;
  time: string;
}

export interface DepartmentStat {
  name: string;
  percentage: number;
  colorClass: string;
}
