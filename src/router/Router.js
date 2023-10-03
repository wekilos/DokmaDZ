import { React, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

import PageLoading from "../components/PageLoading";

import {
  Home,
  About,
  Products,
  Pictures,
  Contact,
  News,
  AllNews,
} from "../pages/index";

import ScrollIntoView from "./ScrollIntoView";

const PrivateRoute = lazy(() => import("./PrivateRoute"));
const PublicRoute = lazy(() => import("./PublicRoute"));
const App = () => {
  return (
    // forceRefresh={true}
    // history={history}
    <BrowserRouter>
      <ScrollIntoView>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <PublicRoute
              restricted={true}
              component={Home}
              path="/home"
              exact
            />
            <PublicRoute
              restricted={true}
              component={About}
              path="/about"
              exact
            />
            <PublicRoute
              restricted={true}
              component={Products}
              path="/products"
              exact
            />
            <PublicRoute
              restricted={true}
              component={AllNews}
              path="/news"
              exact
            />
            <PublicRoute
              restricted={true}
              component={News}
              path="/news/:id"
              exact
            />
            <PublicRoute
              restricted={true}
              component={Contact}
              path="/contacts"
              exact
            />

            <PublicRoute component={Home} path="*" />
            {/* <Route path="*" component={Home} /> */}
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
