import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    Re_enter_password: "",
  });
  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const register = () => {
    const { name, email, password, Re_enter_password } = user;
    if (name && email && password && password === Re_enter_password) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert(res.data.message);
        navigate("/login");
      });
    } else {
      alert("Invalid details");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="register">
      {console.log("User", user)}
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleEvent}
        placeholder="Enter your name"
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleEvent}
        placeholder="Enter your email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleEvent}
        placeholder="Enter your Password"
      ></input>
      <input
        type="password"
        name="Re_enter_password"
        value={user.Re_enter_password}
        onChange={handleEvent}
        placeholder="Re-enter Password"
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
