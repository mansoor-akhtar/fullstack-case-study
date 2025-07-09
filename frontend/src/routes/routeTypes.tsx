export const ROUTE_TYPES = {
  public: "public",
  private: "private",
} as const;

// Create a type that represents the possible values of ROUTE_TYPES
export type RouteType = typeof ROUTE_TYPES[keyof typeof ROUTE_TYPES];

// Type guard or boolean checkers
export const isPrivate = (routeType: RouteType): boolean =>
  routeType === ROUTE_TYPES.private;

export const isPublic = (routeType: RouteType): boolean =>
  routeType === ROUTE_TYPES.public;
