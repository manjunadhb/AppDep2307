import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Leaves from "./components/Leaves";
import Tasks from "./components/Tasks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/tasks" element={<Tasks></Tasks>}></Route>
        <Route path="/leaves" element={<Leaves></Leaves>}></Route>
        <Route
          path="/editProfile"
          element={<EditProfile></EditProfile>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
