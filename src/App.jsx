import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchResponse, setSearchResponse] = useState({});
  const [tempData, setTempData] = useState("");
  const [inputData, setInputData] = useState("");

  const fetchData = async (searchParam) => {
    fetch(`http://universities.hipolabs.com/search?country=${searchParam}`)
      .then((res) => res.json())
      .then((data) => setSearchResponse(data));
  };

  useEffect(() => {
    fetchData(tempData);
  }, [tempData]);

  const handleSearch = () => {
    setTempData(inputData);
  };
  const handleClear = () => {
    setSearchResponse({});
    setInputData("");
    setTempData("");
  };

  return (
    <>
      <input
        type="search"
        name="enter a country"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}  style={{margin:'30px'}}
      />
      <input type="button" value="search" onClick={handleSearch} />
      <input
        type="button"
        value="Clear"
        onClick={handleClear}
        style={{ marginLeft: "10px" }}
      />

      <div style={{marginLeft: '50px'}}>Total Universities {searchResponse.length}</div>
      <div className="display">
        {searchResponse.length > 0 ? (
          searchResponse.map((item, index) => (
            <>
              <div key={index} className="item">
                <h3>{item.name}</h3>
                <p>{item.alpha_two_code}</p>
                <p>{item.web_pages}</p>
              </div>
            </>
          ))
        ) : (
          <h1>😐😐no data available</h1>
        )}
      </div>
    </>
  );
}

export default App;
