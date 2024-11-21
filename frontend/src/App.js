import React, { useState } from "react";
import "./App.css";
import ContextProvider from "./router/Router";
import Router from "./router/Router"

function App() {
  return (
    <ContextProvider>
      <Router/>
    </ContextProvider>
  );
}

export default App;
