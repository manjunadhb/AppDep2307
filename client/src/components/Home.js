import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TopNavigation from "./TopNavigation";

function Home() {
  let dispatch = useDispatch();
  let storeObj = useSelector((store) => {
    return store;
  });

  console.log(storeObj);

  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Home</h1>
      <h2>
        Hi, Welcome to {storeObj.userReducer.loginDetails.firstName}
        {storeObj.userReducer.loginDetails.lastName}
      </h2>
      <img
        src={`http://localhost:5678/${storeObj.userReducer.loginDetails.profilePic}`}
      ></img>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "addTask", data: 1 });
          }}
        >
          Add Task
        </button>
        <button
          onClick={() => {
            dispatch({ type: "removeTask", data: 1 });
          }}
        >
          Remove Task
        </button>
        <button
          onClick={() => {
            dispatch({ type: "editTask", data: 1 });
          }}
        >
          Edit Task
        </button>
        <button
          onClick={() => {
            dispatch({ type: "deleteTask", data: 1 });
          }}
        >
          Delete Task
        </button>
        <button
          onClick={() => {
            dispatch({ type: "addLeave", data: 1 });
          }}
        >
          Add Leave
        </button>
        <button
          onClick={() => {
            dispatch({ type: "removeLeave", data: 1 });
          }}
        >
          Remove Leave
        </button>
        <button
          onClick={() => {
            dispatch({ type: "editLeave", data: 1 });
          }}
        >
          Edit Leave
        </button>
        <button
          onClick={() => {
            dispatch({ type: "cancelLeave", data: 1 });
          }}
        >
          Cancel Leave
        </button>
      </div>
    </div>
  );
}

export default Home;
