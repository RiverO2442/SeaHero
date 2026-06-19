type Row = Record<string, string | number>;

function toCsv(headers: string[], rows: Row[]): string {
  const escape = (v: string | number) => {
    const s = String(v);
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h] ?? "")).join(",")),
  ];
  return lines.join("\r\n");
}

function download(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export interface AttendanceExportRow {
  name: string;
  department: string;
  status: string;
  hoursWorked: number;
  dailyRate: number;
  estPayout: number;
}

export function exportAttendanceCsv(date: string, rows: AttendanceExportRow[]) {
  const headers = ["Name", "Department", "Status", "Hours Worked", "Daily Rate", "Est. Payout"];
  const data: Row[] = rows.map((r) => ({
    Name: r.name,
    Department: r.department,
    Status: r.status,
    "Hours Worked": r.hoursWorked,
    "Daily Rate": r.dailyRate,
    "Est. Payout": r.estPayout,
  }));
  download(`attendance_${date}.csv`, toCsv(headers, data));
}

export interface PayrollExportRow {
  name: string;
  department: string;
  role: string;
  daysWorked: number;
  grossPay: number;
  deductions: number;
  netPay: number;
  status: string;
}

export function exportPayrollCsv(period: string, rows: PayrollExportRow[]) {
  const headers = ["Name", "Department", "Role", "Days Worked", "Gross Pay", "Deductions", "Net Pay", "Status"];
  const data: Row[] = rows.map((r) => ({
    Name: r.name,
    Department: r.department,
    Role: r.role,
    "Days Worked": r.daysWorked,
    "Gross Pay": r.grossPay,
    Deductions: r.deductions,
    "Net Pay": r.netPay,
    Status: r.status,
  }));
  download(`payroll_${period}.csv`, toCsv(headers, data));
}
