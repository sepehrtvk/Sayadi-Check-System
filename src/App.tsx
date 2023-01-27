import React, { useState } from "react";
import "./App.css";
import CheckPage from "./Pages/CheckPage";
import LoginPage from "./Pages/LoginPage/LoginPage";

export type PageTypes = "loginPage" | "checkPage";

function App() {
  const [currentPage, setCurrentPage] = useState<PageTypes>("loginPage");

  const navigateTo = (page: PageTypes) => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage == "loginPage" && <LoginPage navigateTo={navigateTo} />}
      {currentPage == "checkPage" && <CheckPage navigateTo={navigateTo} />}
    </>
  );
}

export default App;
