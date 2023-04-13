import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBook = () => {
  //--------------------------------------------------------------------
  // ? Toast => for Success...
  const success = () =>
    toast.success("👍Successfully your Book has been Added", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });

  //--------------------------------------------------------------------
  //? React hook useState...
  const [Btn_loading, setBtn_loading] = useState(true);
  //--------------------------------------------------------------------
  //? useNavigate is the method from react-router-dom...
  const navigate = useNavigate();
  //--------------------------------------------------------------------
  const Input_Form_Validation = useFormik({
    initialValues: {
      BookName: "",
      Author: "",
      ISBN: "",
      PublishedYear: "",
      publisher: "",
      CoverImage: "",
      BookUrl: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.BookName) {
        errors.BookName = "Please Enter Book Name";
      } else if (values.BookName.length < 6) {
        errors.BookName = "Characters should be above 6";
      } else if (values.BookName.length > 40) {
        errors.BookName = "Characters should be below 40";
      }
      // -----------------------------------------------------------
      if (!values.Author) {
        errors.Author = "Please Enter Author Name";
      } else if (values.Author.length < 6) {
        errors.Author = "Characters should be above 6";
      } else if (values.Author.length > 40) {
        errors.Author = "Characters should be below 40";
      }
      // -----------------------------------------------------------
      if (!values.ISBN) {
        errors.ISBN = "Please Enter Validate ISBN number";
      } else if (
        JSON.stringify(values.ISBN).length > 3 &&
        JSON.stringify(values.ISBN).length < 13
      ) {
        errors.ISBN = "ISBN must be 13 digits";
      }
      // -----------------------------------------------------------
      if (!values.PublishedYear) {
        errors.PublishedYear = "Please Enter Published Year";
      } else if (JSON.stringify(values.PublishedYear).length < 4) {
        errors.PublishedYear = "Year must be 4 digits";
      } else if (JSON.stringify(values.PublishedYear) > 2023) {
        errors.PublishedYear = "Year must be not greater than 2023";
      }
      // -----------------------------------------------------------
      if (!values.publisher) {
        errors.publisher = "Please Enter Publisher Name";
      } else if (values.publisher.length < 6) {
        errors.publisher = "Characters should be above 6";
      } else if (values.publisher.length > 40) {
        errors.publisher = "Characters should be below 40";
      }
      // -----------------------------------------------------------
      if (!values.CoverImage) {
        errors.CoverImage = "Please Paste the cover image of the Book";
      }
      // -----------------------------------------------------------
      if (!values.BookUrl) {
        errors.BookUrl = "Please Paste the URL of the Book";
      }
      // -----------------------------------------------------------
      return errors;
    },
    onSubmit: (values) => {
      setBtn_loading(false);
      Create_Book();
      async function Create_Book() {
        try {
          await axios.post(
            `https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub`,
            values
          );
          success();
          setBtn_loading(true);
          navigate("/dashboard/Admin-BooksList");
          // console.log(Create_Book_Data);
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group col-md-10">
            <h1 className="add-edit-title">ADD NEW BOOK</h1>
          </div>
          

          <form onSubmit={Input_Form_Validation.handleSubmit}>
            <div className="form-row d-flex justify-content-center input-data-form col-md-9 ml-lg-5 p-3 mt-5 mb-4 bg-light form-div-element">
              <div className="form-group col-lg-5">
                <label htmlFor="BookName">Book Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.BookName
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="BookName"
                  value={Input_Form_Validation.values.BookName}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Book Name . . ."
                />
                {Input_Form_Validation.errors.BookName ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.BookName}
                  </span>
                ) : null}
              </div>
              {/* -------------------------------------------- */}
              {/*  Author */}
              <div className="form-group col-lg-5">
                <label htmlFor="Author">Author Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.Author
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="Author"
                  value={Input_Form_Validation.values.Author}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Author Name . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.Author}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* ISBN */}
              <div className="form-group col-lg-5">
                <label htmlFor="ISBN">ISBN Number</label>
                <input
                  type="number"
                  className={`form-control ${
                    Input_Form_Validation.errors.ISBN
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="ISBN"
                  value={Input_Form_Validation.values.ISBN}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter ISBN Number . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.ISBN}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* PublishedYear */}
              <div className="form-group col-lg-5">
                <label htmlFor="PublishedYear">Published Year</label>
                <input
                  type="number"
                  className={`form-control ${
                    Input_Form_Validation.errors.PublishedYear
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="PublishedYear"
                  value={Input_Form_Validation.values.PublishedYear}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter PublishedYear . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.PublishedYear}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* Publisher */}
              <div className="form-group col-lg-5">
                <label htmlFor="PublishedYear">Publisher</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.publisher
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="publisher"
                  value={Input_Form_Validation.values.publisher}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Enter Publisher . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.publisher}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* Book URL */}
              <div className="form-group col-lg-5">
                <label htmlFor="BookUrl">Book URL</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.BookUrl
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="BookUrl"
                  value={Input_Form_Validation.values.BookUrl}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Paste Book Url . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.BookUrl}
                  </span>
                }
              </div>
              {/* -------------------------------------------- */}
              {/* Cover Image */}
              <div className="form-group col-lg-10">
                <label htmlFor="CoverImage">Cover Image</label>
                <input
                  type="text"
                  className={`form-control ${
                    Input_Form_Validation.errors.CoverImage
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="CoverImage"
                  value={Input_Form_Validation.values.CoverImage}
                  onChange={Input_Form_Validation.handleChange}
                  placeholder="Paste Book Image Url . . ."
                />
                {
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Input_Form_Validation.errors.CoverImage}
                  </span>
                }
              </div>

              {/* -------------------------------------------- */}
            </div>
            {/* SUBMIT BUTTON */}
            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"submit"}
                className="btn btn-primary green-color"
              >
                {Btn_loading ? "SUBMIT" : <div class="submit-btn-loader"></div>}
              </button>
            </div>
            {/* -------------------------------------------- */}
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;