import React from "react";
import Leftbar from "../Leftbar/Leftbar";

import Rightbar from "../Rightbar/Rightbar";
import "./Allcontent.css";
function Allcontent() {
  return (
    <div className="Allcontent">
      <Leftbar />
      <Rightbar />
    </div>
  );
}

export default Allcontent;
