import Preference from "../../views/preference";
import type { RouteProps } from "../../types";

const routes: RouteProps[] = [
  {
    path: "preferences",
    exact: true,
    component: Preference
  }
];

export default routes;
