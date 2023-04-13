import {
    faTachometerAlt,
    faList,
    faAdd,
    faUserCircle,
    faBookOpen,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useEffect, useState } from "react";
  
  import { Link } from "react-router-dom";
  
  function SideBar({ setAnimate_visible, side_toggle, setside_toggle }) {
    const [boolean, setboolean] = useState();
  
    useEffect(() => {
      const visible = JSON.parse(window.localStorage.getItem("dashboard"));
      setboolean(visible);
    }, []);
  
    console.log(side_toggle);
    // -------------------------------------------------------------------------------------
    return (
      <>
        {/*Sidebar*/}
        <ul
          className={
            side_toggle
              ? `navbar-nav sidebar-color sidebar sidebar-dark accordion toggled`
              : "navbar-nav sidebar-color sidebar sidebar-dark accordion"
          }
          id="accordionSidebar"
        >
          {/*Sidebar - Brand*/}
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/dashboard"
          >
            <div className="sidebar-brand-icon  sb-admin-icon">
              {boolean ? (
                <FontAwesomeIcon icon={faBookOpen} />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} />
              )}
            </div>
            <div className="sidebar-brand-text ">
              {boolean ? "Library Hub" : "Admin"}
            </div>
          </Link>
          {/* ---------------------------*/}
          {/*Divider*/}
          <hr className="sidebar-divider my-0" />
          {/* ---------------------------*/}
          {/*Nav Item - Dashboard*/}
          <li className="nav-item active side-list-item">
            <Link
              className="nav-link"
              to="/dashboard"
              onClick={() => setAnimate_visible(true)}
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faTachometerAlt} />
              <span>Dashboard</span>
            </Link>
          </li>
          {/* ---------------------------*/}
          {/*Divider*/}
          <hr className="sidebar-divider" />
          {/* ---------------------------*/}
  
          {/*Heading*/}
          <div className="sidebar-heading">Addons</div>
  
          {/* -------------------------------------------------------------*/}
          {/*Nav Item - ADD DATA*/}
          {boolean ? (
            ""
          ) : (
            <li className="nav-item side-list-item active">
              <Link
                className="nav-link"
                to={"/dashboard/AddBook"}
                // to={boolean ? "/dashboard/Add-Data" : "/dashboard/Add-Teacher-Data"}
                onClick={() => setAnimate_visible(false)}
              >
                <FontAwesomeIcon className="sidebar-icon" icon={faAdd} />
                <span style={{ letterSpacing: "0.5px" }}>Add Book</span>
              </Link>
            </li>
          )}
          {/* -------------------------------------------------------------*/}
          {/*Nav Item - BOOKS LIST*/}
          <li className="nav-item side-list-item active">
            <Link
              className="nav-link"
              onClick={() => setAnimate_visible(false)}
              to={boolean ? "/dashboard/Reader-BooksList" : "/dashboard/Admin-BooksList"}
            >
              <FontAwesomeIcon className="sidebar-icon" icon={faList} />
              <span style={{ letterSpacing: "0.5px" }}>
                {boolean ? "Books List" : "Books List"}
              </span>
            </Link>
          </li>
          {/* -------------------------------------------------------------*/}
          {/* ---------------------------*/}
          {/*Divider*/}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* ---------------------------*/}
          {/*Sidebar Message*/}
        </ul>
        {/*End of Sidebar*/}
      </>
    );
  }
  
  export default SideBar;