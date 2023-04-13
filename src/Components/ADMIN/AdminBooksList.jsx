import axios from "axios";
import React, { useEffect, useState } from "react";
import { faDeleteLeft, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./BooksList.css";

const AdminBooksList = ({ Data_visible, setData_visible }) => {
  //-------------------------------------------------------------------
  //? toast for deleting the data...
  const Delete = (Book_Name) =>
    toast.error(`"${Book_Name}" Book is Deleted`, {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });
  //-------------------------------------------------------------------
  //? Delete Confirmation alert message...
  const Delete_confirmation = (selected_id, Book_Name) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => destroy(selected_id, Book_Name),
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
    });
  };
  //-------------------------------------------------------------------
  //? React hook...
  const [Book_Data, setBook_Data] = useState([]);
  //-------------------------------------------------------------------
  async function destroy(selected_id, Book_Name) {
    try {
      //-------------------------------------------------------------------
      setData_visible(true);
      //-------------------------------------------------------------------
      await axios.delete(
        `https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub/${selected_id}`
      );
      //-------------------------------------------------------------------
      Delete(Book_Name);
      //-------------------------------------------------------------------
      const GetData = await axios.get(
        "https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub"
      );
      //-------------------------------------------------------------------
      setData_visible(false);
      setBook_Data(GetData.data);
      //-------------------------------------------------------------------
    } catch (error) {
      console.log(error);
    }
  }
  // --------------------------------------------------------
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
            {/*  mapping the BOOKS data... */}
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
                  {/* BOOKSNAME */}
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
                      to={`/dashboard/Admin-SelectedBook/${item.id}`}
                    >
                      View{" "}
                      <FontAwesomeIcon className="crud-btn-icon" icon={faEye} />
                    </Link>
                    {/* ------------------------------------------------------------------- */}
                    {/* Edit button... */}
                    <Link
                      type="button"
                      className="nav-link card-button"
                      to={`/dashboard/EditBook/${item.id}`}
                    >
                      Edit{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faEdit}
                      />
                    </Link>
                    {/* ------------------------------------------------------------------- */}
                    {/* Delete button... */}
                    <button
                      type="button"
                      className="nav-link card-button"
                      onClick={() =>
                        Delete_confirmation(item.id, item.BookName)
                      }
                    >
                      Delete{" "}
                      <FontAwesomeIcon
                        className="crud-btn-icon"
                        icon={faDeleteLeft}
                      />
                    </button>
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

export default AdminBooksList;