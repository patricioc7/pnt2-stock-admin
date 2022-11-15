import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigator from "./components/navigator/navigator";
import Footer from "./components/footer/footer";
import Stocks from "./components/stocks/stocks";
import { SessionContext } from "./context/sessionContext";
import { getSessionCookie } from "./services/sessionCookie";
import Products from "./components/products/products";
import Stores from "./components/stores/stores";
import History from "./components/history/history";
import Customers from "./components/customers/customers";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());

  useEffect(() => {
    setSession(getSessionCookie());
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      <Router>
        <div>
          <Navigator />
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/stocks">
              <Stocks />
            </Route>
            <Route path="/stores">
              <Stores />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/">
              <Stocks />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </SessionContext.Provider>
  );
}

function Users() {
  return <h2>Users</h2>;
}
