import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  </div>
);

const Section: React.FC<{ icon: string; title: string; subtitle: string; children: React.ReactNode }> = ({
  icon, title, subtitle, children,
}) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const SettingsPage: React.FC = () => {
  const [name, setName] = useLocalStorage("settings_name", "Alex Thompson");
  const [email, setEmail] = useLocalStorage("settings_email", "alex.t@salarypro.com");
  const [timezone, setTimezone] = useLocalStorage("settings_timezone", "UTC+7 - Ho Chi Minh City");
  const [taxRate, setTaxRate] = useLocalStorage("settings_taxRate", "15");
  const [payCycle, setPayCycle] = useLocalStorage("settings_payCycle", "Monthly");
  const [emailNotifs, setEmailNotifs] = useLocalStorage("settings_emailNotifs", true);
  const [payrollAlerts, setPayrollAlerts] = useLocalStorage("settings_payrollAlerts", true);
  const [systemAlerts, setSystemAlerts] = useLocalStorage("settings_systemAlerts", false);
  const [weeklyReport, setWeeklyReport] = useLocalStorage("settings_weeklyReport", true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Settings</h2>
          <p className="text-slate-500 font-medium mt-1">Manage your account and payroll preferences.</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-5 py-2.5 text-sm font-semibold rounded-lg shadow-lg transition-all ${
            saved
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200 hover:scale-[1.02]"
          }`}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile */}
        <Section icon="manage_accounts" title="Profile" subtitle="Your account information">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Timezone</label>
              <div className="relative">
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white">
                  {["UTC+7 - Ho Chi Minh City", "UTC+0 - London", "UTC-5 - New York", "UTC+9 - Tokyo"].map((tz) => (
                    <option key={tz}>{tz}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Payroll Config */}
        <Section icon="receipt_long" title="Payroll Configuration" subtitle="Default tax and cycle settings">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Default Tax Rate (%)</label>
              <div className="relative">
                <input type="number" min="0" max="100" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full pr-8 px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">%</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pay Cycle</label>
              <div className="relative">
                <select value={payCycle} onChange={(e) => setPayCycle(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white">
                  {["Monthly", "Bi-weekly", "Weekly"].map((c) => <option key={c}>{c}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-xs font-bold text-blue-700">Current Configuration</p>
              <p className="text-xs text-blue-600 mt-1">{taxRate}% tax rate &mdash; {payCycle} cycle</p>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon="notifications" title="Notifications" subtitle="Control what alerts you receive">
          <div className="divide-y divide-slate-100">
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} label="Email Notifications" description="Receive updates via email" />
            <Toggle checked={payrollAlerts} onChange={setPayrollAlerts} label="Payroll Alerts" description="Alerts when payroll is ready to approve" />
            <Toggle checked={systemAlerts} onChange={setSystemAlerts} label="System Alerts" description="API failures and sync errors" />
            <Toggle checked={weeklyReport} onChange={setWeeklyReport} label="Weekly Summary Report" description="Sent every Monday morning" />
          </div>
        </Section>

        {/* Keyboard shortcuts */}
        <Section icon="keyboard" title="Keyboard Shortcuts" subtitle="Speed up navigation with hotkeys">
          <div className="space-y-2">
            {[
              { keys: ["G", "then", "D"], action: "Go to Dashboard" },
              { keys: ["G", "then", "E"], action: "Go to Employees" },
              { keys: ["G", "then", "P"], action: "Go to Payroll" },
              { keys: ["G", "then", "A"], action: "Go to Analytics" },
              { keys: ["G", "then", "R"], action: "Go to Reports" },
              { keys: ["/"], action: "Focus search (Employee Directory)" },
            ].map(({ keys, action }) => (
              <div key={action} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-600">{action}</span>
                <div className="flex items-center gap-1">
                  {keys.map((k, i) => (
                    k === "then" ? (
                      <span key={i} className="text-[10px] text-slate-400 font-medium px-0.5">then</span>
                    ) : (
                      <kbd key={i} className="inline-flex items-center justify-center min-w-[26px] h-6 px-1.5 bg-slate-100 border border-slate-300 rounded text-[11px] font-bold text-slate-700 shadow-sm">
                        {k}
                      </kbd>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Danger zone */}
        <Section icon="warning" title="Danger Zone" subtitle="Irreversible actions - proceed with caution">
          <div className="space-y-3">
            <button className="w-full py-2.5 px-4 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left flex items-center gap-2">
              <span className="material-symbols-outlined text-base">delete_forever</span>
              Clear all payroll history
            </button>
            <button className="w-full py-2.5 px-4 rounded-lg border border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors text-left flex items-center gap-2">
              <span className="material-symbols-outlined text-base">restart_alt</span>
              Reset employee data to defaults
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default SettingsPage;
