import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import ViewUsers from "./components/ViewUsers/ViewUsers";
import AddUser from "./components/AddUser/AddUser";
import UserDetails from "./components/UserDetails/User";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Header />
        </header>
        <main id="main-content">
          <Switch>
            <Route path="/addUser" component={AddUser} />
            <Route path="/user/:userId" component={UserDetails} />
            <Route path="/" exact component={ViewUsers} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
