export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  FEATURES: {
    ROOT: '/features',
    TEMPLATE_TABLE: '/features/template-table',
    PEA_CALC: '/features/pea-calc',
  },
  NOT_FOUND: '/404',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
