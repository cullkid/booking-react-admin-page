import axios from "axios";
import "./login.scss";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  //importing Authcontext state to apply it's switch cases state
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  //async is needed because of the api request
  const handleClick = async (e) => {
    e.preventDefault();

    //adding first authcontext switch case state which is "login_start" using dispatch & no payload because it is loading the login state and its not returning any state
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);

      //add the login-success switch case state to run if the login is successful
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="lcontainer">
        <div className="lcentered">
          <article className="iparent">
            <input
              className="child"
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
            />
          </article>
          <article className="iparent">
            <input
              className="child"
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
          </article>
          <article className="iparent">
            <button disabled={loading} onClick={handleClick}>
              Login
            </button>
            {error && <span className="">{error.message}</span>}
          </article>
        </div>
      </div>
    </div>
  );
};

export default Login;
