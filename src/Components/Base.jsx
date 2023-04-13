import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
import TopNavBar from "../Components/TopBar";
import Searchbar from "./ADMIN/SearchBar";

const Base = ({ Animate_visible, setAnimate_visible }) => {

  const [side_toggle, setside_toggle] = useState(false);

  return (
    <>
      {/*Page Wrapper*/}
      <div id="wrapper" className="sidebar-toggled">
        <SideBar
          setAnimate_visible={setAnimate_visible}
          side_toggle={side_toggle}
          setside_toggle={setside_toggle}
        />
        {/* ---------------------------*/}
        {/*Content Wrapper*/}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*Main Content*/}
          <div id="content">
            <TopNavBar
              side_toggle={side_toggle}
              setside_toggle={setside_toggle}
            />
            {/* ---------------------------*/}
            {/*Begin Page Content*/}
            {/* start container-fluid*/}
            <div className="container-fluid bg-color">
              {/* outlet holds all the children components... */}
              {Animate_visible ? <Searchbar/> : <Outlet></Outlet>}
            </div>
            {/*End container-fluid*/}

            {/* ---------------------------*/}
            {/*End Main Content*/}
          </div>
          {/* ---------------------------*/}
          {/*Footer*/}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright 2023 &copy; All rights Reserved</span>
              </div>
            </div>
          </footer>
          {/*End of Footer*/}

          {/* --------------------------------------------- */}
          {/*End Content Wrapper*/}
        </div>

        {/*End of Wrapper*/}
      </div>
    </>
  );
};

export default Base;