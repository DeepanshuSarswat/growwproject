import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Body/Home/Home";
import Details from "./Components/Details/Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route path="All-Banks" element={<Home />} />
          </Route>
          <Route path="/bank-details/:id" element={<Details />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
