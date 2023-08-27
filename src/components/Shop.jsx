import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { CardComponent } from "./HomeCard";
import axios from "axios";

function Shop() {
  const { search } = useParams(); // Get the search term from the URL parameter
  const [filter, setFilter] = useState({ brand: "all", type: "all" });
  const [records, setRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/product"); // Change the URL to your products API
        setRecords(response.data);
      } catch (e) {
        console.log("Error fetching data:", e);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let newData = records;

    if (filter.brand !== "all") {
      newData = newData.filter((item) => item.brand === filter.brand);
    }

    if (filter.type !== "all") {
      newData = newData.filter((item) => item.tag === filter.type);
    }

    setFilteredData(newData);
  }, [filter, records]);

  useEffect(() => {
    if (search !== "") {
      // Use search instead of link
      const a = records.filter((data) => {
        return (
          Array.isArray(data.hash) &&
          data.hash.some((hashElement) => hashElement.includes(search))
        );
      });
      setFilteredData(a);
    }
  }, [search, records]);

  const handleBrandChange = (event) => {
    setFilter({ ...filter, brand: event.target.value });
  };

  const handleTypeChange = (event) => {
    setFilter({ ...filter, type: event.target.value });
  };

  return (
    <div className="shop">
      <div className="filteritems">
        <div className="type">
          <label htmlFor="type">Type:</label>
          <input
            type="radio"
            id="allitems"
            name="type"
            value="all"
            defaultChecked
            onChange={handleTypeChange}
          />
          <label htmlFor="allitems">All</label>
          <input
            type="radio"
            id="premium"
            name="type"
            value="premium"
            onChange={handleTypeChange}
          />
          <label htmlFor="premium">Premium</label>
          <input
            type="radio"
            id="limited"
            name="type"
            value="limited"
            onChange={handleTypeChange}
          />
          <label htmlFor="limited">Limited</label>
        </div>
        <div className="brands">
          <label htmlFor="brand">Brand:</label>
          <select
            name="brand"
            id="brandchoice"
            value={filter.brand}
            onChange={handleBrandChange}
          >
            <option value="all">All</option>
            <option value="H&M">H&M</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
      </div>
      <div className="items">
        {filteredData.length > 0
          ? filteredData.map((item) => (
              <div key={item.id} className="pcard shopcomponentcard">
                <CardComponent element={item} />
              </div>
            ))
          : records.map((item) => (
              <div key={item.id} className="pcard shopcomponentcard">
                <CardComponent element={item} />
              </div>
            ))}
      </div>
    </div>
  );
}
export default Shop;
