import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../../Header/Header";
import Allcontent from "../Allcontent/Allcontent";

function Home() {
  return (
    <div className="homee">
      <Header />
      <Allcontent />
    </div>
  );
}

export default Home;
