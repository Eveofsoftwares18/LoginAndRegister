import React, { useState } from "react";
import Homepage from "./Components/Homepage/Homepage";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Homepage setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
