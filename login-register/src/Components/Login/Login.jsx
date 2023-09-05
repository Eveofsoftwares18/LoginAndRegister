import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const login = () => {
    const { email, password } = user;
    if (email && password) {
      axios.post("http://localhost:9002/login", user).then((res) => {
        alert(res.data.message);
        setLoginUser(res.data.user);
        navigate("/");
      });
    }
  };

  return (
    <div className="login">
      {console.log("User", user)}
      <h1>Login</h1>
      <input
        name="email"
        value={user.email}
        onChange={handleEvent}
        placeholder="Enter your email"
      ></input>
      <input
        name="password"
        value={user.password}
        onChange={handleEvent}
        placeholder="Enter your Password"
        type="password"
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
