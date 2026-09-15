import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("layouts/AdminLayout.tsx", [
    route("admin", "features/dashboard/pages/DashboardPage.tsx"),
    route("admin/tracking", "routes/admin/tracking.tsx"),
    route("admin/buses", "routes/admin/buses.tsx"),
    route("admin/drivers", "routes/admin/drivers.tsx"),
    route("admin/routes", "routes/admin/routes.tsx"),
    route("admin/passengers", "routes/admin/passengers.tsx"),
    route("admin/alerts", "routes/admin/alerts.tsx"),
    route("admin/analytics", "routes/admin/analytics.tsx"),
    route("admin/ai", "routes/admin/ai.tsx"),
    route("admin/settings", "routes/admin/settings.tsx"),
  ]),
] satisfies RouteConfig;