import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import StarProvider from "./contexts/star";

import Routes from "./routes";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <StarProvider>
            <Routes />
          </StarProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
