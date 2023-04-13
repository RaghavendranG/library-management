import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../ADMIN/SelectedBook.css";
const ReaderSelectedBook = ({ Data_visible, setData_visible }) => {
  // --------------------------------------------------------
  //? React hook UseState...
  const [view, setView] = useState([]);
  // --------------------------------------------------------
  //? React-router-dom => useParams ...
  const { BookId } = useParams();
  // --------------------------------------------------------
  useEffect(() => {
    // --------------------------------------------------------
    SelectedBookData();

    async function SelectedBookData() {
      try {
        setData_visible(true);
        // --------------------------------------------------------
        const SelectedData = await axios.get(
          `https://64001ac363e89b0913a737c5.mockapi.io/LibraryHub/${BookId}`
        );
        // console.log(SelectedData.data);
        setView(SelectedData.data);
        // --------------------------------------------------------
        setData_visible(false);
      } catch (error) {
        // alert(`error.message
        // Something went wrong`)
        console.log(error);
      }
    }
  }, []);
  // --------------------------------------------------------
  return (
    <>
      <div>
        <h2 className="component-title">ミ★ 𝘚𝘌𝘓𝘌𝘊𝘛𝘌𝘋 𝘉𝘖𝘖𝘒 ★彡</h2>
        <h4 className="component-sub-title">H͢o͢v͢e͢r͢ t͢o͢ O͢p͢e͢n͢ B͢o͢o͢k͢</h4>
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
        <div>
          <div className="selected-Book d-flex justify-content-center mt-3">
            <div class="book">
              <div className="card-info">
                <div className="key-title">BOOk NAME:</div>
                <></>
                <div className="key-body">{view.BookName}</div>

                <div>
                  <div className="key-title">AUTHOR:</div>
                  <></>
                  <div className="key-body">{view.Author}</div>
                </div>
                <div>
                  <div className="key-title">PUBLISHED YEAR:</div>
                  <></>
                  <div className="key-body">{view.PublishedYear}</div>
                </div>
                <div>
                  <div className="key-title">PUBLISHER:</div>
                  <></>
                  <div className="key-body">{view.publisher}</div>
                </div>
                <div>
                  <div className="key-title">ISBN:</div>
                  <></>
                  <div className="key-body">{view.ISBN}</div>
                </div>
                <div>
                  <div className="key-title">WEBSITE URL:</div>
                  <></>
                  <button type="button" className="website-link">
                    <a href={view.BookUrl} target="blank" className="link">
                      {" "}
                      LINK
                    </a>
                  </button>
                </div>
              </div>

              <div class="cover">
                <img
                  className="card-image"
                  src={`${view.CoverImage}`}
                  alt="404"
                ></img>
              </div>
            </div>
            {/* -------------------------------------------------------- */}
          </div>
          {/* -------------------------------------------------------- */}
          {/* Back button... */}
          <div className="row d-flex justify-content-center mt-3">
            <Link
              type="button"
              className="back-btn"
              to={"/dashboard/Reader-BooksList"}
            >
              BACK
            </Link>
          </div>
          {/* -------------------------------------------------------- */}
        </div>
      )}
    </>
  );
};

export default ReaderSelectedBook;