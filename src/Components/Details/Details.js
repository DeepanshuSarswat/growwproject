import React from "react";
import "./Details.css";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";
function Details() {
  const { id } = useParams();
  let outputvalue = gtData();
  function gtData() {
    let List = localStorage.getItem("Banks");
    if (List) {
      console.log(List);
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  console.log(outputvalue);
  return (
    <div>
      <Header />

      <div className="BankDetailpage">
        {outputvalue ? (
          <table>
            <tr>
              <th>Bank Name:</th>
              <td>{outputvalue.bank_name}</td>
            </tr>
            <tr>
              <th>Bank ID:</th>
              <td>{outputvalue.bank_id}</td>
            </tr>
            <tr>
              <th>BRANCH:</th>
              <td>{outputvalue.branch}</td>
            </tr>
            <tr>
              <th>CITY:</th>
              <td>{outputvalue.city}</td>
            </tr>
            <tr>
              <th>DISTRICT:</th>
              <td>{outputvalue.district}</td>
            </tr>
            <tr>
              <th>STATE:</th>
              <td>{outputvalue.state}</td>
            </tr>
            <tr>
              <th>IFSC:</th>
              <td>{outputvalue.ifsc}</td>
            </tr>
            <tr>
              <th>ADDRESS:</th>
              <td>{outputvalue.address}</td>
            </tr>
          </table>
        ) : (
          <p>Data not found</p>
        )}
      </div>
    </div>
  );
}

export default Details;
