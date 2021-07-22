import React, { useState } from "react";

import { Link } from "react-router-dom";

function Header() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div id="app-header">
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              MERN Stack
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li
              className={activeTab === "home" ? "active" : ""}
              onClick={() => setActiveTab("home")}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={activeTab === "add" ? "active" : ""}
              onClick={() => setActiveTab("add")}
            >
              <Link to="/addUser">Add User</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
