import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditBook = () => {
  //--------------------------------------------------------------------
  //? toast for updated...
  const success = () =>
    toast.success("Your Book is Updated", {
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
  //-------------------------------------------------------------------
  //? useParams function from react-router-dom...
  const { BookId } = useParams();

  //-------------------------------------------------------------------
  //? useNavigate is the method from react-router-dom..
  const navigate = useNavigate();
  //-------------------------------------------------------------------
  const Edit_Book_Data = useFormik({
    initialValues: {
      BookName: "",
      Author: "",
      ISBN: "",
      PublishedYear: "",
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
    onSubmit: async (values) => {
      try {
        //--------------------------------------------------------------------
        setBtn_loading(false);
        //--------------------------------------------------------------------
        //? Update values...
        //? After edited data validation is completed take the particular Book id and add the updated values...
        await axios.put(
          `https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub/${BookId}`,
          values
        );
        //--------------------------------------------------------------------
        success();
        navigate("/dashboard/Admin-BooksList");
        //--------------------------------------------------------------------
      } catch (error) {
        alert(`<<< ! Something went wrong >>>
        => ${error}`);
        //--------------------------------------------------------------------
        setBtn_loading(true);
      }
    },
  });
  //-------------------------------------------------------------------
  useEffect(() => {
    Set_Book_Values();
    async function Set_Book_Values() {
      try {
        //? If we fetch data without await keyword means it will return response as a promise object...
        //? To handle the promise object we should use await keyword ...
        //? when edit button is clicked we have to set the values to the input fields
        //? For that we need to get the data from the server and then set the values to the useFormik initialvalues property...
        //-------------------------------------------------------------------
        const SetData = await axios.get(
          `https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub/${BookId}`
        );
        //-------------------------------------------------------------------
        //console.log(SetData.data);
        //? Before useFormik(object) we cannot (setValues => is a formik inbuilt function) to the initialvalues...
        Edit_Book_Data.setValues(SetData.data);
        //-------------------------------------------------------------------
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group col-md-10">
            <h1 className="add-edit-title">ミ★ 𝘌𝘋𝘐𝘛 𝘉𝘖𝘖𝘒 𝘋𝘈𝘛𝘈 ★彡</h1>
          </div>
          {/* onSubmit should be given to parent element (form) 
     bcoz if we given it to any input/button it will check the value of the particular field
     But , if we given it to <form> => parent element it will validate/check the value of the children also... */}

          <form onSubmit={Edit_Book_Data.handleSubmit}>
            <div className="form-row d-flex justify-content-center input-data-form col-md-9 ml-lg-5 p-3 mt-5 mb-4 bg-light form-div-element">
              {/* -------------------------------------------- */}

              {/* Book Name */}
              <div className="form-group col-lg-5">
                <label htmlFor="BookName">Book Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    Edit_Book_Data.errors.BookName ? "is-invalid" : "is-valid"
                  }`}
                  name="BookName"
                  value={Edit_Book_Data.values.BookName}
                  onChange={Edit_Book_Data.handleChange}
                  placeholder="Enter Book Name . . ."
                />
                {Edit_Book_Data.errors.BookName ? (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "cursive",
                    }}
                  >
                    {Edit_Book_Data.errors.BookName}
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
                    Edit_Book_Data.errors.Author ? "is-invalid" : "is-valid"
                  }`}
                  name="Author"
                  value={Edit_Book_Data.values.Author}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.Author}
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
                    Edit_Book_Data.errors.ISBN ? "is-invalid" : "is-valid"
                  }`}
                  name="ISBN"
                  value={Edit_Book_Data.values.ISBN}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.ISBN}
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
                    Edit_Book_Data.errors.PublishedYear
                      ? "is-invalid"
                      : "is-valid"
                  }`}
                  name="PublishedYear"
                  value={Edit_Book_Data.values.PublishedYear}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.PublishedYear}
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
                    Edit_Book_Data.errors.publisher ? "is-invalid" : "is-valid"
                  }`}
                  name="publisher"
                  value={Edit_Book_Data.values.publisher}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.publisher}
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
                    Edit_Book_Data.errors.BookUrl ? "is-invalid" : "is-valid"
                  }`}
                  name="BookUrl"
                  value={Edit_Book_Data.values.BookUrl}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.BookUrl}
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
                    Edit_Book_Data.errors.CoverImage ? "is-invalid" : "is-valid"
                  }`}
                  name="CoverImage"
                  value={Edit_Book_Data.values.CoverImage}
                  onChange={Edit_Book_Data.handleChange}
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
                    {Edit_Book_Data.errors.CoverImage}
                  </span>
                }
              </div>

              {/* -------------------------------------------- */}
            </div>
            {/* UPDATE BUTTON */}
            <div className="form-group col-md-10 mt-2">
              <button
                type={"submit"}
                value={"Update"}
                className="btn btn-primary green-color"
              >
                {Btn_loading ? "UPDATE" : <div class="submit-btn-loader"></div>}
              </button>
            </div>
            {/* -------------------------------------------- */}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBook;