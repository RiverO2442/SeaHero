import React, { useRef } from "react";

interface PayslipData {
  employeeName: string;
  employeeId: string;
  department: string;
  role: string;
  payPeriod: string;
  grossSalary: number;
  incomeTax: number;
  nationalInsurance: number;
  pension: number;
  otherDeductions: number;
  netPay: number;
  companyName?: string;
  paymentDate?: string;
}

interface Props {
  data: PayslipData;
  onClose: () => void;
}

const fmt = (n: number) => `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const PayslipPDFExport: React.FC<Props> = ({ data, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = printRef.current;
    if (!content) return;
    const printWindow = window.open("", "_blank", "width=700,height=900");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payslip — ${data.employeeName} — ${data.payPeriod}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; font-size: 13px; color: #1e293b; padding: 40px; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; border-bottom: 2px solid #2563eb; padding-bottom: 16px; }
            .company { font-size: 22px; font-weight: 800; color: #2563eb; }
            .sub { font-size: 11px; color: #64748b; margin-top: 4px; }
            .title { font-size: 18px; font-weight: 700; color: #1e293b; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
            .meta-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
            .meta-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 6px; }
            .meta-value { font-size: 14px; font-weight: 600; color: #1e293b; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th { background: #f1f5f9; padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; }
            td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
            td:last-child { text-align: right; font-weight: 600; }
            .deduction { color: #dc2626; }
            .total-row td { font-size: 15px; font-weight: 800; border-top: 2px solid #2563eb; border-bottom: none; padding-top: 14px; }
            .net-amount { color: #2563eb; font-size: 22px; }
            .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="company">${data.companyName ?? "SalaryPro Ltd"}</div>
              <div class="sub">123 Business Park, London, UK · payroll@salarypro.com</div>
            </div>
            <div style="text-align:right">
              <div class="title">PAYSLIP</div>
              <div class="sub">Pay Period: ${data.payPeriod}</div>
              ${data.paymentDate ? `<div class="sub">Payment Date: ${data.paymentDate}</div>` : ""}
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-box">
              <div class="meta-label">Employee Name</div>
              <div class="meta-value">${data.employeeName}</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">Employee ID</div>
              <div class="meta-value">${data.employeeId}</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">Department</div>
              <div class="meta-value">${data.department}</div>
            </div>
            <div class="meta-box">
              <div class="meta-label">Role / Position</div>
              <div class="meta-value">${data.role}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr><th>Earnings</th><th style="text-align:right">Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Gross Salary</td><td>${fmt(data.grossSalary)}</td></tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr><th>Deductions</th><th style="text-align:right">Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Income Tax (PAYE)</td><td class="deduction">-${fmt(data.incomeTax)}</td></tr>
              <tr><td>National Insurance</td><td class="deduction">-${fmt(data.nationalInsurance)}</td></tr>
              <tr><td>Pension Contribution</td><td class="deduction">-${fmt(data.pension)}</td></tr>
              ${data.otherDeductions > 0 ? `<tr><td>Other Deductions</td><td class="deduction">-${fmt(data.otherDeductions)}</td></tr>` : ""}
              <tr class="total-row">
                <td>Net Pay</td>
                <td class="net-amount">${fmt(data.netPay)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            This is a computer-generated payslip and does not require a signature. Generated on ${new Date().toLocaleDateString("en-GB")}.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Modal header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Payslip Preview</h2>
            <p className="text-xs text-slate-500 mt-0.5">{data.employeeName} · {data.payPeriod}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
              <span className="material-symbols-outlined text-base">print</span>
              Print / Save PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        <div ref={printRef} className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-blue-500 pb-4">
            <div>
              <p className="text-xl font-extrabold text-blue-600">{data.companyName ?? "SalaryPro Ltd"}</p>
              <p className="text-xs text-slate-400 mt-0.5">123 Business Park, London, UK</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100">PAYSLIP</p>
              <p className="text-xs text-slate-400">Pay Period: {data.payPeriod}</p>
              {data.paymentDate && <p className="text-xs text-slate-400">Payment Date: {data.paymentDate}</p>}
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Employee Name", data.employeeName],
              ["Employee ID",   data.employeeId],
              ["Department",    data.department],
              ["Role",          data.role],
            ].map(([label, value]) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
              </div>
            ))}
          </div>

          {/* Earnings */}
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="px-4 py-2 text-left text-xs font-bold text-slate-500 uppercase">Earnings</th>
                  <th className="px-4 py-2 text-right text-xs font-bold text-slate-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">Gross Salary</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-slate-900 dark:text-slate-100">{fmt(data.grossSalary)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions */}
          <div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="px-4 py-2 text-left text-xs font-bold text-slate-500 uppercase">Deductions</th>
                  <th className="px-4 py-2 text-right text-xs font-bold text-slate-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Income Tax (PAYE)",   data.incomeTax],
                  ["National Insurance",  data.nationalInsurance],
                  ["Pension Contribution",data.pension],
                  ...(data.otherDeductions > 0 ? [["Other Deductions", data.otherDeductions]] : []),
                ].map(([label, amount]) => (
                  <tr key={label as string} className="border-b border-slate-100 dark:border-slate-700">
                    <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{label}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-red-500">-{fmt(amount as number)}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-blue-500">
                  <td className="px-4 pt-3 text-base font-extrabold text-slate-900 dark:text-slate-100">Net Pay</td>
                  <td className="px-4 pt-3 text-right text-xl font-extrabold text-blue-600">{fmt(data.netPay)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Computer-generated payslip · Generated {new Date().toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </div>
  );
};
