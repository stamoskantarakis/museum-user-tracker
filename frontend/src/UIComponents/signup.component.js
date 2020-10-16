import React from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation,
} from "mdbreact";
import "../styles/signup.css";
import Navbar from "./navbar.component";
import Footer from "./footer.component";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    if (false) {
      dispatch(register(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <MDBAnimation type="fadeIn">
      <div id="signup">
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <Navbar />
            <MDBContainer>
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    Sign up right now!
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Web Application that simulates the movement of mobile users
                    inside interior enviroment. Log in and use the app.
                  </h6>
                  <a href="http://localhost:3000/info">
                    <MDBBtn outline color="white">
                      Learn More
                    </MDBBtn>
                  </a>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <form onSubmit={handleRegister}>
                      <MDBCard id="classic-card" style={{ marginLeft: "5rem" }}>
                        <MDBCardBody className="white-text">
                          <h3 className="text-center">Sign Up</h3>
                          <hr className="hr-light" />
                          <MDBInput
                            className="white-text"
                            iconClass="white-text"
                            label="Your name"
                            icon="user"
                            required="true"
                            onChange={onChangeUsername}
                            min="2"
                          />
                          <MDBInput
                            className="white-text"
                            iconClass="white-text"
                            label="Your email"
                            icon="envelope"
                            required="true"
                            onChange={onChangeEmail}
                          />
                          <MDBInput
                            className="white-text"
                            iconClass="white-text"
                            label="Your password"
                            icon="lock"
                            type="password"
                            required="true"
                            onChange={onChangePassword}
                          />
                          <div className="text-center mt-4 black-text">
                            <MDBBtn color="white" type="submit" value="submit">
                              Sign Up
                            </MDBBtn>
                            <hr className="hr-light" />
                            <div className="text-center d-flex justify-content-center white-label">
                              <a href="#!" className="p-2 m-2">
                                <MDBIcon
                                  fab
                                  icon="twitter"
                                  className="white-text"
                                />
                              </a>
                              <a href="#!" className="p-2 m-2">
                                <MDBIcon
                                  fab
                                  icon="linkedin"
                                  className="white-text"
                                />
                              </a>
                              <a href="#!" className="p-2 m-2">
                                <MDBIcon
                                  fab
                                  icon="instagram"
                                  className="white-text"
                                />
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </form>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <Footer />
      </div>
    </MDBAnimation>
  );
};

export default SignUp;
