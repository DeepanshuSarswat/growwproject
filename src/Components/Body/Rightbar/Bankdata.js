import React, { useState, useEffect } from "react";
import "./Bankdata.css";
function Bankdata() {
  const [Banks, setBanks] = useState([]);

  useEffect(() => {
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((response) => response.json())
      .then((data) => {
        setBanks(data);
        console.log(data);
      });
  }, []);

  let LimitBanks;
  let x = 0;
  let y = 10;
  function firstData() {
    LimitBanks = Banks.slice(x, y);
  }
  firstData();
  return (
    <>
      {LimitBanks &&
        LimitBanks.map((Bank, idx) => {
          return (
            <tr>
              <td>{Bank.bank_name}</td>
              <td>{Bank.ifsc}</td>
              <td>{Bank.branch}</td>
              <td>{Bank.bank_id}</td>
              <td>{Bank.address}</td>
            </tr>
          );
        })}
    </>
  );
}

export default Bankdata;
