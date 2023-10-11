import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Explore from "./page/Explore";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="layout-content">
        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="/app/explore" element={<Explore />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
