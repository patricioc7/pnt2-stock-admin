import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigator from "./modules/navigator/navigator";
import Footer from "./modules/footer/footer";
import Stocks from "./modules/stocks/stocks";
import {SessionContext} from "./context/sessionContext";
import {getSessionCookie} from "./services/sessionCookie";

export default function App() {
  const [session, setSession] = useState(getSessionCookie());

  useEffect(
      () => {
        setSession(getSessionCookie());
      },
      [session]
  );

  return (
      <SessionContext.Provider value={session}>
    <Router>
      <div>
        <Navigator />
        <Switch>
          <Route path="/">
            <Stocks />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/Stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
      </SessionContext.Provider>
  );
}

function Users() {
  return <h2>Users</h2>;
}
