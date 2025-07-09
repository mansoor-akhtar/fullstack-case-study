import { Suspense } from "react";
import type { FC } from "react";
import { Route, Routes, BrowserRouter  } from "react-router-dom";
import routesTemplates from "./index";
import PublicLayout from "../layouts/public/Layout";
import PageNotFound from "../views/errors/PageNotFound";
import Auth from "./Auth";
import Spinner from "../components/Spinner";

interface AppRoute {
  path: string;
  [key: string]: any;
}

const AppRoutes: FC = () => {

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={<PublicLayout Component={PageNotFound} route={true} />}
          />

          {/* Dynamic Routes from templates */}
          {routesTemplates.map((routesTemplate: any) => {
            const { routes: appRoutes, template: Template, type } = routesTemplate;
            return appRoutes.map((appRoute: AppRoute) => (
              <Route
                path={appRoute.path}
                key={appRoute.path}
                element={
                  <Auth
                    appRoute={appRoute}
                    Template={Template}
                    route={appRoute.path}
                    type={type}
                  />
                }
              />
            ));
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRoutes;
