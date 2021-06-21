import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/auth";

import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
