import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row } from "antd";
import UserCard from "../userdetails/UserCardSm";
import { Input } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Query(props) {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const { loggedUser } = props.auth;

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

    if (!loggedUser) return <Redirect to="/login" />;

    return (
        <>
            <div className="searchWrapper">
                <Input
                    className="search-bar"
                    icon="search"
                    placeholder="Search for user..."
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>

            <Row className="query-row">
                <div className="cardContainer">
                    {searchInput.length > 1
                        ? filteredResults.map((item, i) => {
                              return <UserCard key={i} data={item} />;
                          })
                        : APIData.map((item, i) => {
                              return <UserCard key={i} data={item} />;
                          })}
                </div>
            </Row>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Query);
