import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import Chat from "./components/Chat/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Auth} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  );
};

export default App;
