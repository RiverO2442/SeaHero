import React, { useState, useEffect, useRef } from "react";
import { OnboardingBanner } from "../components/OnboardingBanner";
import { BudgetAlertBanner } from "../components/BudgetAlertBanner";
import { TopEarnersWidget } from "../components/TopEarnersWidget";
import { LeaveTrackerWidget } from "../components/LeaveTrackerWidget";
import { TeamHeadcountWidget } from "../components/TeamHeadcountWidget";
import { MonthlyTargetWidget } from "../components/MonthlyTargetWidget";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function parseMetricValue(raw: string): { prefix: string; target: number } {
  const prefix = raw.startsWith("$") ? "$" : "";
  const digits = parseFloat(raw.replace(/[$,]/g, ""));
  return { prefix, target: isNaN(digits) ? 0 : digits };
}

function formatMetricNumber(n: number, original: string): string {
  const isInt = !original.includes(".") && Number.isInteger(parseFloat(original.replace(/[$,]/g, "")));
  const formatted = isInt
    ? Math.round(n).toLocaleString("en-US")
    : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return original.startsWith("$") ? `$${formatted}` : formatted;
}

const AnimatedValue: React.FC<{ value: string }> = ({ value }) => {
  const { prefix, target } = parseMetricValue(value);
  const [display, setDisplay] = useState(prefix + "0");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(formatMetricNumber(current, value));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, target]);

  return <>{display}</>;
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface MetricCard {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  badge: React.ReactNode;
  valueColor?: string;
}

interface ActivityItem {
  id: string;
  kind: "person" | "system" | "payment" | "warning";
  avatarUrl?: string;
  initials?: string;
  iconName?: string;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  time: string;
  online?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METRIC_CARDS: MetricCard[] = [
  {
    icon: "account_balance_wallet",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Total Monthly Payroll",
    value: "$452,890",
    badge: (
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
        +12.5%
      </span>
    ),
  },
  {
    icon: "badge",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    label: "Active Employees",
    value: "1,248",
    badge: (
      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
        Stable
      </span>
    ),
  },
  {
    icon: "monitoring",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    label: "Avg Daily Payout",
    value: "$15,120",
    badge: (
      <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
        -2.4%
      </span>
    ),
  },
  {
    icon: "pending_actions",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    label: "Pending Approvals",
    value: "24",
    valueColor: "text-red-600",
    badge: (
      <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse mt-2" />
    ),
  },
];

function relativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const h = Math.floor(minutesAgo / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: "1",
    kind: "person",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADzm5_E5fxV3TNuVA8TjtG4fpPg2OKSjZqcN5iDb_GqzVkQel4dPXEazXDJA46ZS1S0bZTnBHq6JjOuQs-cEOTy9hywpTIJNrMt1HgU-tYy2pFCM2BWb7AJkE_xPbjd4paEGv53uCkjpt4WAZuHdOd4_b1AoJctr8vbCqPPCgTE4B1VHb44BrJfpdQaQE7I26hPMQwPvuCh7rVYDwlR-A0hRdg8G06jXZx_wT7fCX-7I1NH0pjuz3UetE-tfmSkUkQBY29VJ5hXrk",
    iconBg: "",
    iconColor: "",
    title: "Sarah Johnson",
    detail: "Profile updated & salary verified",
    time: relativeTime(2),
    online: true,
  },
  {
    id: "2",
    kind: "payment",
    iconName: "payments",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Batch Release",
    detail: "Released $12,400 to Marketing Dept",
    time: relativeTime(45),
  },
  {
    id: "3",
    kind: "person",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqG2HAwHbNMNqTTdL68fjhulh6Twgm4_j_2uDh9oHExnvDmy789_jZoXT5Xdxuxxa8bku3IXIFQ4WwKwr8HY27JsVXZsF3juCXt2M-3eOFkrZm4pUGkF2XgE13bkhptMRwyGHdtSa5-QfCmiehk7dShMU8bVtgywQFWLgg29eFro2O-q339jnwn7jepzoYKyroQmhjiq96yd8jvecmwqrQvEkeId_sf-z343Nd4FYSJysTnN6TrMBWojrWkUy_DvsY34ggbhSAxfw",
    iconBg: "",
    iconColor: "",
    title: "Marcus Leventis",
    detail: "Submitted tax form for review",
    time: relativeTime(180),
  },
  {
    id: "4",
    kind: "warning",
    iconName: "warning",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    title: "System Alert",
    detail: "API Sync failed for Payroll 002",
    time: relativeTime(300),
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const MetricCards: React.FC = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    {METRIC_CARDS.map((card) => (
      <div
        key={card.label}
        className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 ${card.iconBg} rounded-lg ${card.iconColor}`}>
            <span className="material-symbols-outlined">{card.icon}</span>
          </div>
          {card.badge}
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {card.label}
        </p>
        <h3
          className={`font-extrabold text-2xl mt-1 tabular-nums ${card.valueColor ?? "text-slate-800"}`}
        >
          <AnimatedValue value={card.value} />
        </h3>
      </div>
    ))}
  </section>
);

const PayoutTrendsChart: React.FC = () => (
  <div className="bg-white p-8 rounded-xl shadow-sm relative overflow-hidden">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h4 className="font-bold text-lg text-slate-800">Payout Trends</h4>
        <p className="text-sm text-slate-500">Weekly spending analysis</p>
      </div>
      <div className="flex bg-slate-100 p-1 rounded-lg">
        <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded-md">
          Line
        </button>
        <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-800">
          Bar
        </button>
      </div>
    </div>

    <div className="h-64 w-full relative">
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 800 200"
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0052dc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0052dc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          stroke="#f0f4f7"
          strokeWidth="1"
          x1="0"
          x2="800"
          y1="50"
          y2="50"
        />
        <line
          stroke="#f0f4f7"
          strokeWidth="1"
          x1="0"
          x2="800"
          y1="100"
          y2="100"
        />
        <line
          stroke="#f0f4f7"
          strokeWidth="1"
          x1="0"
          x2="800"
          y1="150"
          y2="150"
        />
        <path
          d="M0,180 L50,140 L150,160 L250,100 L350,130 L450,70 L550,110 L650,40 L800,90 L800,200 L0,200 Z"
          fill="url(#chartGradient)"
        />
        <path
          d="M0,180 L50,140 L150,160 L250,100 L350,130 L450,70 L550,110 L650,40 L800,90"
          fill="none"
          stroke="#0052dc"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <circle cx="250" cy="100" fill="#0052dc" r="4" />
        <circle cx="450" cy="70" fill="#0052dc" r="4" />
        <circle cx="650" cy="40" fill="#0052dc" r="4" />
      </svg>
      <div className="flex justify-between mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  </div>
);

interface QuickActionsProps {
  onNavigate: (page: import("../App").Page) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  const actions = [
    {
      icon: "person_add",
      label: "New Hire",
      tooltip: "Add a new employee to the directory and set up their payroll profile.",
      bg: "bg-blue-50",
      border: "border-blue-100",
      color: "text-blue-600",
      hover: "hover:bg-blue-100",
      onClick: () => onNavigate("employees"),
    },
    {
      icon: "history",
      label: "Audit Logs",
      tooltip: "Review a full history of payroll actions and system events.",
      bg: "bg-purple-50",
      border: "border-purple-100",
      color: "text-purple-600",
      hover: "hover:bg-purple-100",
      onClick: () => {},
    },
    {
      icon: "ios_share",
      label: "Bulk Payout",
      tooltip: "Approve and release payroll for all eligible employees at once.",
      bg: "bg-slate-50",
      border: "border-slate-200",
      color: "text-slate-600",
      hover: "hover:bg-slate-100",
      onClick: () => onNavigate("payroll"),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {actions.map((a) => (
        <div key={a.label} className="relative group/qa">
          <button
            onClick={a.onClick}
            className={`w-full ${a.bg} p-6 rounded-xl border ${a.border} flex flex-col items-center text-center cursor-pointer ${a.hover} transition-colors`}
          >
            <span className={`material-symbols-outlined ${a.color} mb-2 text-3xl`}>
              {a.icon}
            </span>
            <span className="text-xs font-bold text-slate-800">{a.label}</span>
          </button>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl opacity-0 group-hover/qa:opacity-100 transition-opacity pointer-events-none z-10 text-center leading-relaxed">
            {a.tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

const ActivityFeed: React.FC = () => (
  <div className="bg-slate-50 p-6 rounded-xl">
    <h4 className="font-bold text-lg text-slate-800 mb-6 flex items-center justify-between">
      Recent Activity
      <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">
        See All
      </span>
    </h4>

    <div className="space-y-6">
      {ACTIVITY_ITEMS.map((item) => (
        <div key={item.id} className="flex gap-4">
          {/* Avatar / Icon */}
          {item.avatarUrl ? (
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={item.avatarUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-50 rounded-full" />
              )}
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}
            >
              <span className="material-symbols-outlined">{item.iconName}</span>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            <p className="text-[11px] text-slate-500">{item.detail}</p>
            <p className="text-[10px] text-slate-400 font-bold mt-1">
              {item.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PromoCard: React.FC = () => (
  <div className="bg-slate-800 p-6 rounded-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 blur-3xl group-hover:opacity-40 transition-opacity pointer-events-none" />
    <h5 className="font-bold text-white mb-2">Automate with Pro</h5>
    <p className="text-slate-400 text-xs leading-relaxed mb-4">
      Set up recurring bank transfers and tax deductions automatically.
    </p>
    <button className="w-full py-2 bg-white text-slate-800 text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all">
      Configure Now
    </button>
  </div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

interface DashboardOverviewProps {
  onNavigate: (page: import("../App").Page) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
  <div className="space-y-10">
    {/* Onboarding */}
    <OnboardingBanner />

    {/* Budget alert */}
    <BudgetAlertBanner totalPayroll={452890} />

    {/* Page header */}
    <section className="flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">
          Dashboard Overview
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Real-time salary analytics and payout tracking.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleRefresh}
          className="px-4 py-2.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
        >
          <span className={`material-symbols-outlined text-base ${refreshing ? "animate-spin" : ""}`}>refresh</span>
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
        <button className="px-5 py-2.5 bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-300 transition-colors">
          Export Report
        </button>
        <button
          onClick={() => onNavigate("payroll")}
          className="px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform"
        >
          Run New Payroll
        </button>
      </div>
    </section>

    {/* KPI metrics */}
    <MetricCards />

    {/* Chart + Activity */}
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      {/* Left: chart + quick actions */}
      <div className="lg:col-span-2 space-y-6">
        <PayoutTrendsChart />
        <QuickActions onNavigate={onNavigate} />
      </div>

      {/* Right: activity feed + leave + top earners + promo */}
      <div className="space-y-6">
        <ActivityFeed />
        <LeaveTrackerWidget />
        <MonthlyTargetWidget />
        <TopEarnersWidget />
        <TeamHeadcountWidget />
        <PromoCard />
      </div>
    </section>
  </div>
  );
};
