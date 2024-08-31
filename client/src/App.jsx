import React from "react";
import Menupage from "./pages/Menupage/Menupage";
import AlgoPage from "./pages/Algopage/Algopage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="" element={<Menupage />} />
          <Route path="/algorithm/:algo" element={<AlgoPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
