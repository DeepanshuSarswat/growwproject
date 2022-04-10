import React from "react";
import Bankdata from "./Bankdata";
import "./Rightbar.css";
import { memo } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Rightbar() {
  const Cities = ["MUMBAI", "THANE", "PUNE", "NAGPUR", "NASHIK"];
  const Categories = ["ifsc", "branch", "bank_name"];
  let arr = [];
  const [Banks, setBanks] = useState([]);
  const [finalBanks, setfinalBanks] = useState([]);
  let [count, setcount] = useState(1);
  let [chunkData, setchunkData] = useState([]);
  let [starter, setstarter] = useState(1);
  let [ender, setender] = useState(10);
  let [Selectcity, setSelectCity] = useState("");
  let [category, setcategory] = useState("");
  let [InputIfsc, setInputIfsc] = useState("");
  let [filterBanks, setfilterbanks] = useState([]);
  let [ispending, setispending] = useState(true);
  let [Dataerror, setDataerror] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI")
      .then((response) => response.json())
      .then((data) => {
        setBanks(data);
        setispending(false);
      })
      .catch((err) => {
        setDataerror(err.message);
        setispending(false);
      });
  }, []);

  for (let i = 0; i < Banks.length; i++) {
    arr.push(Banks[i]);
  }

  let x;
  let y;
  let Nextpage = () => {
    count = count + 1;
    setcount(count);
    if (count > 1) {
      y = count * 10;
      x = (count - 1) * 10;
      let value = arr.slice(x, y);
      console.log(value);
      setchunkData(value);
      setstarter(x);
      setender(y);
    }
  };
  let Prevpage = () => {
    count = count - 1;
    setcount(count);
    console.log(count);
    if (count > 1) {
      y = count * 10;
      x = (count - 1) * 10 + 1;
      let value = arr.slice(x, y);
      setchunkData(value);
      console.log(value);
      setstarter(x);
      setender(y);
    }
    if (count <= 0) {
      count = 1;
      setcount(count);
      console.log(count);
    }
    if (count == 1) {
      y = 10;
      x = 0;
      let value = arr.slice(x, y);
      setchunkData(value);
      console.log(value);
      setstarter(x);
      setender(y);
    }
  };

  function data() {
    if (Banks.length > 0) {
      let a = Banks.splice(0, 10);
      console.log(a);
      setchunkData(a);
    } else {
      console.log("Khali");
    }
  }

  useEffect(() => {
    data();
  }, [Banks]);

  function getCity(city, category, ifsc) {
    console.log(city);
    fetch(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
      .then((response) => response.json())
      .then((data) => {
        filterDataa(data, category, ifsc);
      })
      .catch((err) => {
        setispending(false);
        setDataerror(err.message);
      });
  }
  function filterDataa(data, category, ifsc) {
    if (category == "ifsc") {
      let dataa = data.filter((e) => e.ifsc == ifsc);
      setfilterbanks(dataa);
      setBanks(dataa);
      setchunkData(dataa);
      setDataerror("Data Not Found");
      dataa.length == 0 && setstarter(0);
      dataa.length == 0 && setender(0);
    } else if (category == "branch") {
      let dataa = data.filter((e) => e.branch == ifsc);
      console.log(dataa);
      setfilterbanks(dataa);
      setBanks(dataa);
      setchunkData(dataa);
      setDataerror("Data Not Found");
      dataa.length == 0 && setstarter(0);
      dataa.length == 0 && setender(0);
    } else if (category == "bank_name") {
      let dataa = data.filter((e) => e.bank_name == ifsc);
      console.log(dataa);
      setfilterbanks(dataa);
      setBanks(dataa);
      setchunkData(dataa);
      setDataerror("Data Not Found");
      dataa.length == 0 && setstarter(0);
      dataa.length == 0 && setender(0);
    }
  }
  function searchBanks(e) {
    setstarter(1);
    setender(10);
    e.preventDefault();
    if (Selectcity && category && InputIfsc) {
      getCity(Selectcity, category, InputIfsc);
    }
  }
  console.log(ispending);
  return (
    <div className="Righbarparent">
      <div className="Rightbar">
        <div className="Rightheader">
          <div className="headerleft">All Banks</div>
          <div className="headerright">
            <form className="headerrightform" onSubmit={searchBanks}>
              <div>
                <select
                  required
                  name="City"
                  id="City"
                  onChange={(e) => setSelectCity(e.target.value)}
                >
                  <option value="City" disabled selected hidden>
                    City
                  </option>
                  {Cities.map((city, idx) => {
                    return (
                      <option value={city} key={idx}>
                        {city}
                      </option>
                    );
                  })}
                </select>
                <select
                  required
                  name="category "
                  id="category"
                  onChange={(e) => setcategory(e.target.value)}
                >
                  <option value="category" disabled selected hidden>
                    category
                  </option>
                  {Categories.map((data, idx) => {
                    return (
                      <option value={data} key={idx}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <SearchIcon className="seacrhIcon" />
                <input
                  type={"text"}
                  required
                  placeholder="Search"
                  onChange={(e) => setInputIfsc(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="rightbarbody">
          <table border="1">
            <tr>
              <th>Bank</th>
              <th>IFSC</th>
              <th>Branch</th>
              <th>Bank ID</th>
              <th>Address</th>
            </tr>
            <>
              {ispending && <div className="loading">Loading...</div>}
              {chunkData.length == 0 && (
                <div className="notfound">{Dataerror}</div>
              )}
              {chunkData?.map((Bank, idx) => {
                return (
                  <tr
                    key={idx}
                    onClick={() => {
                      localStorage.setItem("Banks", JSON.stringify(Bank));
                      navigate(`/bank-details/${Bank.ifsc}`);
                    }}
                  >
                    <td>{Bank.bank_name}</td>
                    <td>{Bank.ifsc}</td>
                    <td>{Bank.branch}</td>
                    <td>{Bank.bank_id}</td>
                    <td>{Bank.address}</td>
                  </tr>
                );
              })}
            </>
          </table>
        </div>
      </div>
      <div>
        <div className="footer">
          <div className="footerleft">Rows per page:10</div>
          <div className="footerright">
            <p>
              <button disabled={count == 1 ? true : false} onClick={Prevpage}>
                <ArrowBackIosIcon className="ArowIcon" />
              </button>
              <p>
                {" "}
                {starter}-{ender} Of {Math.ceil(Banks.length / 10)}
              </p>
              <button
                disabled={chunkData.length == 0 ? true : false}
                onClick={Nextpage}
              >
                <ArrowForwardIosIcon className="ArowIcon" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Rightbar);
