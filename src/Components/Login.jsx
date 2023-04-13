import { faUser, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Login = ({ setComponent_visible, setAnimate_visible }) => {
  return (
    <div className="login-protal">
      <div className="container ">
        {/*Outer Row*/}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/*Nested Row within Card Body*/}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block ">
                    <lottie-player
                      src="https://assets1.lottiefiles.com/packages/lf20_1a8dx7zj.json"
                      background="transparent"
                      speed="1"
                      className="bg-login-image"
                      style={{
                        width: "vw",
                        height: "500px",
                      }}
                      loop
                      autoplay
                    ></lottie-player>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-900 mb-4 welcome-text">
                          Welcome Book Lover
                        </h1>
                      </div>
                      <form className="user">
                        <div className="row">
                          <div className="col-sm-12 mb-5 login-title">
                          Library Management System
                          </div>
                        </div>
                        <Link
                          to="/dashboard"
                          onClick={() => {
                            window.localStorage.setItem("dashboard", true);
                            setComponent_visible(true);
                            setAnimate_visible(true);
                          }}
                          className="btn btn-primary btn-user btn-block"
                        >
                          <FontAwesomeIcon icon={faUser} className="mr-1" />{" "}
                          Readers Login
                        </Link>
                        <hr />
                        <Link
                          to="/dashboard"
                          onClick={() => {
                            window.localStorage.setItem("dashboard", false);
                            setAnimate_visible(true);
                            setComponent_visible(false);
                          }}
                          className="btn btn-google btn-user btn-block"
                        >
                          <FontAwesomeIcon
                            icon={faUserGraduate}
                            className="mr-2"
                          />
                          Admin Login
                        </Link>
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;