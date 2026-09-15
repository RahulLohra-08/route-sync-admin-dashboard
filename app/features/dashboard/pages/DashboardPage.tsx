import {
  Activity,
  AlertTriangle,
  Bus,
  CheckCircle2,
  Clock3,
  Route,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Buses",
    value: "128",
    change: "+8.2%",
    description: "from last month",
    icon: Bus,
  },
  {
    title: "Active Buses",
    value: "94",
    change: "73.4%",
    description: "fleet currently active",
    icon: Activity,
  },
  {
    title: "Active Drivers",
    value: "76",
    change: "+4.1%",
    description: "from last month",
    icon: Users,
  },
  {
    title: "Active Routes",
    value: "24",
    change: "92%",
    description: "operating normally",
    icon: Route,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium text-primary">Operations Center</p>

        <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Good morning, Admin 👋
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across the RouteSync transport network.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <p className="mt-2 font-heading text-2xl font-bold">
                    {stat.value}
                  </p>
                </div>

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="font-medium text-primary">
                  {stat.change}
                </span>

                <span className="text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main operations section */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
        {/* Live Operations */}
        <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-heading font-semibold">
                Live Operations
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Current fleet activity
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Live
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-3">
            <OperationCard
              icon={CheckCircle2}
              label="On Route"
              value="87"
              description="Buses operating normally"
            />

            <OperationCard
              icon={Clock3}
              label="Delayed"
              value="5"
              description="Require attention"
            />

            <OperationCard
              icon={AlertTriangle}
              label="Offline"
              value="2"
              description="No GPS signal"
            />
          </div>

          {/* Map placeholder */}
          <div className="mx-5 mb-5 flex min-h-[280px] items-center justify-center rounded-xl border border-dashed bg-muted/30">
            <div className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bus className="size-6" />
              </div>

              <h3 className="mt-3 font-heading font-semibold">
                Live Tracking Map
              </h3>

              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                The real-time Leaflet map will appear here once GPS and
                WebSocket tracking are connected.
              </p>
            </div>
          </div>
        </section>

        {/* System Status */}
        <section className="rounded-xl border bg-card shadow-sm">
          <div className="border-b px-5 py-4">
            <h2 className="font-heading font-semibold">System Status</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              RouteSync infrastructure health
            </p>
          </div>

          <div className="space-y-1 p-3">
            <SystemStatus
              name="Backend API"
              status="Operational"
              latency="42 ms"
            />

            <SystemStatus
              name="WebSocket"
              status="Connected"
              latency="18 ms"
            />

            <SystemStatus
              name="PostgreSQL"
              status="Operational"
              latency="12 ms"
            />

            <SystemStatus
              name="GPS Network"
              status="Operational"
              latency="—"
            />

            <SystemStatus
              name="AI Prediction Engine"
              status="Standby"
              latency="—"
            />
          </div>

          <div className="mx-5 mb-5 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />

              <span className="text-sm font-medium">
                Network performance
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              All critical RouteSync services are currently operating within
              expected parameters.
            </p>
          </div>
        </section>
      </div>

      {/* Activity */}
      <section className="rounded-xl border bg-card shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="font-heading font-semibold">Recent Activity</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Latest operational events
          </p>
        </div>

        <div className="divide-y">
          <ActivityRow
            title="Bus RS-104 started trip"
            description="Route Ranchi → Namkum"
            time="2 min ago"
          />

          <ActivityRow
            title="Driver assigned to RS-117"
            description="Driver profile updated successfully"
            time="8 min ago"
          />

          <ActivityRow
            title="Bus RS-102 reported delay"
            description="Estimated delay: 7 minutes"
            time="14 min ago"
          />

          <ActivityRow
            title="New passenger registered"
            description="Account created through mobile application"
            time="21 min ago"
          />
        </div>
      </section>
    </div>
  );
}

function OperationCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <span className="text-sm font-medium">{label}</span>
      </div>

      <p className="mt-3 font-heading text-2xl font-bold">{value}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function SystemStatus({
  name,
  status,
  latency,
}: {
  name: string;
  status: string;
  latency: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-muted/50">
      <div className="flex items-center gap-3">
        <span className="size-2 rounded-full bg-primary" />

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{status}</p>
        </div>
      </div>

      <span className="text-xs text-muted-foreground">{latency}</span>
    </div>
  );
}

function ActivityRow({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{title}</p>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <span className="shrink-0 text-xs text-muted-foreground">{time}</span>
    </div>
  );
}