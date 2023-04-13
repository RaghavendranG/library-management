import axios from "axios";
import React, { useEffect, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import "../ADMIN/BooksList.css";

const ReaderBooksList = ({ Data_visible, setData_visible }) => {
  //? React hook...
  const [Book_Data, setBook_Data] = useState([]);
  //-------------------------------------------------------------------
  //? useEffect will execute one time On initial Mounting stage...
  useEffect(() => {
    Get_Library_Data();
    // --------------------------------------------------------
    async function Get_Library_Data() {
      //-------------------------------------------------------------------
      setData_visible(true);
      //-------------------------------------------------------------------
      try {
        const Library_Data = await axios.get(
          "https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub"
        );
        setBook_Data(Library_Data.data);
        //-------------------------------------------------------------------
        setData_visible(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  // --------------------------------------------------------
  // //? On Unmounting statge this useEffect function executes...
  // //? We can write operations when Component destruction...
  // useEffect(() => {
  //   //? If useEffect Returns a function means => Component is destroyed...
  //   return () => {
  //     console.log("Component destroyed");
  //   };
  // }, []);

  // --------------------------------------------------------

  return (
    <>
      <div>
        <h2 className="component-title">BOOKS</h2>
      </div>

      {Data_visible ? (
        <div className="row data-loading">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_xyrusege.json"
            background="transparent"
            speed="1"
            style={{
              width: "vw",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
            }}
            loop
            autoplay
          ></lottie-player>
        </div>
      ) : (
        //-------------------------------------------------------------------
        <div className="row">
          <div className="col-md-12">
            {/* ------------------------------------------------------------------- */}
            {/*  mapping the Books data... */}
            {Book_Data.map((item, index) => {
              return (
                <div className="Book-card shadow-inset-center" key={index}>
                  <div className="card-border-top"></div>
                  {/* ------------------------------------------------------------------- */}
                  {/* Image for the BOOK... */}
                  <div>
                    <img
                      src={item.CoverImage}
                      alt="404"
                      className="Book-img"
                    ></img>
                  </div>
                  {/* ------------------------------------------------------------------- */}
                  {/* BOOKNAME. */}
                  <div className="a">
                    <div className="key-name">BOOK NAME</div>
                    <div className="key-value">
                      {`${item.BookName.slice(0, 35)}`}
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------- */}
                  {/* AUTHOR */}
                  <div className="b">
                    <div className="key-name">AUTHOR</div>
                    <div className="key-value">
                      {" "}
                      {`${item.Author.slice(0, 30)}`}{" "}
                    </div>
                  </div>
                  {/* ------------------------------------------------------------------- */}
                  <div className="card-buttons">
                    {/* ------------------------------------------------------------------- */}
                    {/* View button ... */}
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/Reader-SelectedBook/${item.id}`}
                    >
                      View Book
                      <FontAwesomeIcon className="crud-btn-icon" icon={faEye} />
                    </Link>
                    {/* ------------------------------------------------------------------- */}
                  </div>
                </div>
              );
            })}
            {/* END OF BOOK CARD */}
            {/* ------------------------------------------------------------------- */}
          </div>
        </div>
      )}
    </>
  );
};

export default ReaderBooksList;