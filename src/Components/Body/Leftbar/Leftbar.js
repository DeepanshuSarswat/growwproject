import React from "react";
import "./Leftbar.css";
import { useNavigate } from "react-router-dom";
function Leftbar() {
  const usenevigate = useNavigate();
  return (
    <div className="Leftbar">
      <ul>
        <li
          onClick={() => {
            usenevigate("/All-Banks");
          }}
        >
          All Banks
        </li>
        <li>Favorite</li>
      </ul>
    </div>
  );
}

export default Leftbar;
