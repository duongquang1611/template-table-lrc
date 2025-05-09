export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  FUNCTIONS_LIST: "/functions-list",
  DEMO_TEMPLATE_TABLE: "/functions-list/template-table",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
