import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "semantic-ui-react";
import { Row, Col } from "antd";
import UserCard from "../userdetails/UserCard";
import "./query.css";

export default function Query() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/all/50`).then((response) => {
      setAPIData(response.data);
    });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <div className="cardContainer">
        <Row gutter={[16, 16]}>
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return <UserCard data={item} style={{ padding: 20 }} />;
              })
            : APIData.map((item) => {
                return (
                  <Col span={6}>
                    <UserCard data={item} style={{ padding: 20 }} />
                  </Col>
                );
              })}
        </Row>
      </div>
    </div>
  );
}
