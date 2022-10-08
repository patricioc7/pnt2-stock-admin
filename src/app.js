import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navigator from "./modules/navigator/navigator";
import Footer from "./modules/footer/footer";
import Stocks from "./modules/stocks/stocks";

export default function App() {
    return (
        <Router>
            <div>
               <Navigator />

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
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
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
