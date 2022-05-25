import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };
  const loginUser = async (data) => {
    const res = await axios.post("/accounts/login", data);
    console.log(res.data.data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", res.data.data.token);
  };
  const { search } = useLocation();
  const to = new URLSearchParams(search).get("next");

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      username: email,
      password: password,
    };
    setEmail("");
    setPassword("");
    try {
      await loginUser(loginData);
      navigate(to || "/");
    } catch (error) {
      setErr(error?.response?.data?.errors || error.message);
    }
  };

  return (
    <>

      <div className="login-">
        <form>
          <p className="login-req">{!to ? "" : "Login is required"}</p>
          <p>{err}</p>
          <input
            type="text"
            name="username"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email or email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangePass}
            placeholder="Password"
          />
          <button className="user-auth" onClick={(e) => onSubmit(e)}>Login</button>
          <p>
            Don't have an account? <span>Sign up</span>{" "}
          </p>
        </form>
      </div>

    </>
  );
}
