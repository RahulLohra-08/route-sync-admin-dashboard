import {
  Activity,
  BarChart3,
  Bus,
  ChevronDown,
  CircleAlert,
  LayoutDashboard,
  Map,
  Settings,
  Sparkles,
  Users,
  UserRoundCog,
} from "lucide-react";
import { NavLink } from "react-router";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    to: "/admin",
  },
  {
    label: "Live Tracking",
    icon: Activity,
    to: "/admin/tracking",
  },
  {
    label: "Buses",
    icon: Bus,
    to: "/admin/buses",
  },
  {
    label: "Drivers",
    icon: UserRoundCog,
    to: "/admin/drivers",
  },
  {
    label: "Routes",
    icon: Map,
    to: "/admin/routes",
  },
  {
    label: "Passengers",
    icon: Users,
    to: "/admin/passengers",
  },
  {
    label: "Alerts",
    icon: CircleAlert,
    to: "/admin/alerts",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    to: "/admin/analytics",
  },
  {
    label: "AI Intelligence",
    icon: Sparkles,
    to: "/admin/ai",
  },
];

export function Sidebar() {
  return (
     <aside className="flex w-64 shrink-0 flex-col border-r bg-sidebar">
      {/* Brand */}
      <div className="flex h-16 items-center border-b px-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <Bus className="size-5" />
          </div>

          <div>
            <h1 className="font-heading text-lg font-semibold tracking-tight">
              RouteSync
            </h1>

            <p className="text-[11px] text-sidebar-foreground/60">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Operations
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  ].join(" ")
                }
              >
                <Icon className="size-[18px] shrink-0" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t p-3">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            ].join(" ")
          }
        >
          <Settings className="size-[18px]" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}