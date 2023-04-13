import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import ApiData from "./ApiData";

const Searchbar = () => {
  const [SearchValue, setSearchValue] = useState("");
  const [LibraryBooksData, setLibraryBooksData] = useState([]);
  const [DataVisible, setDataVisibility] = useState(false);
  async function LibraryData(input_value) {
    try {
      const Get_Books_Data = await axios.get(
        `https://openlibrary.org/search.json?title=${input_value}`
      );
      setLibraryBooksData(Get_Books_Data.data.docs[0]);
      setDataVisibility(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header className="header">
        <div className="header-content  flex flex-c text-center text-black">
          <div className="header-title text-capitalize">
            Find Books
          </div>
          <br />
          {/* ---------------------------------------------------------------- */}
          {/* SEARCH BAR */}
          <div className="container">
            <div className="row">
              <div className="col-md-12  d-flex justify-content-center ">
                <div className="input-group  col-md-5">
                  <input
                    onChange={(input) => setSearchValue(input.target.value)}
                    value={SearchValue}
                    type="text"
                    className="form-control bg-light border-1 small"
                    placeholder="Search for Books "
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="search"
                      onClick={() => LibraryData(SearchValue)}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
                {/* ---------------------------------------------------------------- */}
              </div>
              <div className="col-md-12 d-flex justify-content-center">
                {DataVisible ? (
                  <ApiData LibraryBooksData={LibraryBooksData} />
                ) : null}
              </div>
            </div>
          </div>
          {/* ---------------------------------------------------------------- */}
        </div>
      </header>
    </>
  );
};

export default Searchbar;