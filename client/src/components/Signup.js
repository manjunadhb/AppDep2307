import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicURL, setProfilePicURL] = useState("./images/noImage.png");

  let sendSignupDataToServerFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Sign Up</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            onChange={() => {
              let selectedImageURL = URL.createObjectURL(
                profilePicInputRef.current.files[0]
              );
              setProfilePicURL(selectedImageURL);
            }}
          ></input>
          <br></br>
          <img className="profilePreview" src={profilePicURL}></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendSignupDataToServerFD();
            }}
          >
            Signup(Form Data)
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
