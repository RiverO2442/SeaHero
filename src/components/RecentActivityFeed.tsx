import React, { useState } from "react";

type ActivityKind = "person" | "payment" | "warning" | "system";

interface ActivityItem {
  id: string;
  kind: ActivityKind;
  avatarUrl?: string;
  iconName?: string;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  time: string;
  online?: boolean;
}

function relativeTime(minutesAgo: number): string {
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const h = Math.floor(minutesAgo / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const ITEMS: ActivityItem[] = [
  {
    id: "1", kind: "person",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADzm5_E5fxV3TNuVA8TjtG4fpPg2OKSjZqcN5iDb_GqzVkQel4dPXEazXDJA46ZS1S0bZTnBHq6JjOuQs-cEOTy9hywpTIJNrMt1HgU-tYy2pFCM2BWb7AJkE_xPbjd4paEGv53uCkjpt4WAZuHdOd4_b1AoJctr8vbCqPPCgTE4B1VHb44BrJfpdQaQE7I26hPMQwPvuCh7rVYDwlR-A0hRdg8G06jXZx_wT7fCX-7I1NH0pjuz3UetE-tfmSkUkQBY29VJ5hXrk",
    iconBg: "", iconColor: "", title: "Sarah Johnson",
    detail: "Profile updated & salary verified", time: relativeTime(2), online: true,
  },
  {
    id: "2", kind: "payment", iconName: "payments",
    iconBg: "bg-blue-50", iconColor: "text-blue-600",
    title: "Batch Release", detail: "Released $12,400 to Marketing Dept", time: relativeTime(45),
  },
  {
    id: "3", kind: "person",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqG2HAwHbNMNqTTdL68fjhulh6Twgm4_j_2uDh9oHExnvDmy789_jZoXT5Xdxuxxa8bku3IXIFQ4WwKwr8HY27JsVXZsF3juCXt2M-3eOFkrZm4pUGkF2XgE13bkhptMRwyGHdtSa5-QfCmiehk7dShMU8bVtgywQFWLgg29eFro2O-q339jnwn7jepzoYKyroQmhjiq96yd8jvecmwqrQvEkeId_sf-z343Nd4FYSJysTnN6TrMBWojrWkUy_DvsY34ggbhSAxfw",
    iconBg: "", iconColor: "", title: "Marcus Leventis",
    detail: "Submitted tax form for review", time: relativeTime(180),
  },
  {
    id: "4", kind: "warning", iconName: "warning",
    iconBg: "bg-red-50", iconColor: "text-red-600",
    title: "System Alert", detail: "API Sync failed for Payroll 002", time: relativeTime(300),
  },
  {
    id: "5", kind: "system", iconName: "person_add",
    iconBg: "bg-emerald-50", iconColor: "text-emerald-600",
    title: "New Hire Added", detail: "Julian Wan joined Engineering", time: relativeTime(420),
  },
];

const KIND_LABELS: Record<ActivityKind, string> = {
  person: "People",
  payment: "Payments",
  warning: "Alerts",
  system: "System",
};

const FILTERS: Array<"all" | ActivityKind> = ["all", "person", "payment", "warning", "system"];

export const RecentActivityFeed: React.FC = () => {
  const [filter, setFilter] = useState<"all" | ActivityKind>("all");

  const visible = filter === "all" ? ITEMS : ITEMS.filter((i) => i.kind === filter);

  return (
    <div className="bg-slate-50 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-lg text-slate-800">Recent Activity</h4>
        <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">See All</span>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
              filter === f ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-100"
            }`}
          >
            {f === "all" ? "All" : KIND_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {visible.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">No activity for this filter.</p>
        ) : visible.map((item) => (
          <div key={item.id} className="flex gap-4">
            {item.avatarUrl ? (
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={item.avatarUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                {item.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-50 rounded-full" />
                )}
              </div>
            ) : (
              <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0`}>
                <span className="material-symbols-outlined">{item.iconName}</span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">{item.title}</p>
              <p className="text-[11px] text-slate-500">{item.detail}</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
