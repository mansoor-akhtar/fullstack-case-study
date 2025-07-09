import PublicLayout from "../layouts/public/Layout";
import PrivateLayout from "../layouts/private/Layout";
import privateRoutes from "./types/private";
import publicRoutes from "./types/public";
import { ROUTE_TYPES } from "./routeTypes";
import type { ComponentType } from "react";

export interface AppRoute {
  path: string;
  [key: string]: any;
}

export interface RouteTemplate {
  routes: AppRoute[];
  template: ComponentType<any>;
  type: string;
}

const routesTemplate: RouteTemplate[] = [
  {
    routes: publicRoutes,
    template: PublicLayout,
    type: ROUTE_TYPES.public,
  },
  {
    routes: privateRoutes,
    template: PrivateLayout,
    type: ROUTE_TYPES.private,
  }
];

export default routesTemplate;
