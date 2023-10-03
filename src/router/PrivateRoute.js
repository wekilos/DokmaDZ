import React, { Suspense } from "react";
import { Route, useHistory } from "react-router-dom";
import { isLoginAdmin } from "../utils";
import PageLoading from "../components/PageLoading";
import { Login } from "../pages/index";

const Headers = React.lazy(() => import("../components/header"));
const Footer = React.lazy(() => import("../components/footer"));

const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoginAdmin() || true ? (
          <div>
            <Suspense fallback={<PageLoading />}>
              <Headers />
            </Suspense>
            <div
              className="p-0"
              style={{
                width: "90%",
                minHeight: "80vh",
                margin: "0 auto",
                padding: "0px",
              }}
            >
              <Component {...props} />
              {/* <div className="xl:h-0 h-[100px] w-full"></div> */}
            </div>
            <Suspense fallback={<PageLoading />}>
              <Footer />
            </Suspense>
          </div>
        ) : (
          <Route component={Login} />
          // history.push({ pathname: "/login" })
        )
      }
    />
  );
};

export default PrivateRoute;
