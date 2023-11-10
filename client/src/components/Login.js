import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    //validateTokenFromServer();
    axios.defaults.baseURL = "http://localhost:5678";
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
  }, []);

  let validateTokenFromServer = async () => {
    if (localStorage.getItem("token")) {
      let dataToSend = new FormData();
      dataToSend.append("token", localStorage.getItem("token"));

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch(
        "http://localhost:5678/validateToken",
        reqOptions
      );

      let JSOData = await JSONData.json();

      if (JSOData.status == "failure") {
        alert(JSOData.msg);
      } else {
        dispatch({ type: "login", data: JSOData.data[0] });
        navigate("/home");
      }

      console.log(JSOData);
    }
  };

  let validateLoginFromServer = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "http://localhost:5678/validateLogin",
      reqOptions
    );

    let JSOData = await JSONData.json();

    if (JSOData.status == "failure") {
      alert(JSOData.msg);
    } else {
      // localStorage.setItem("email", emailInputRef.current.value);
      // localStorage.setItem("password", passwordInputRef.current.value);
      localStorage.setItem("token", JSOData.token);
      console.log(JSOData);
      dispatch({ type: "login", data: JSOData.data[0] });
      navigate("/home");
    }
  };

  let validateLogin = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch(
        "http://localhost:5678/validateLogin",
        reqOptions
      );

      let JSOData = await JSONData.json();

      if (JSOData.status == "failure") {
        alert(JSOData.msg);
      } else {
        localStorage.setItem("token", JSOData.token);
        console.log(JSOData);
        dispatch({ type: "login", data: JSOData.data[0] });
        navigate("/home");
      }
    };
  };

  let validateLoginUsingAxios = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let response = await axios.post("/validateLogin", dataToSend);

    localStorage.setItem("token", response.data.token);

    //let getResponse = await axios.get("https://fakestoreapi.com/products");

    console.log(response);
    //console.log(getResponse);
  };

  return (
    <div className="App">
      <form>
        <h2>Login</h2>

        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef} type="password"></input>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              //validateLoginFromServer();
              //dispatch(validateLogin());
              validateLoginUsingAxios();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default Login;
