import axios from "axios";

import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axiosBase from "../api";


export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const onChangefirstName = (e) => {
    setFirstName(e.target.value);
  };
  const [lastName, setLastName] = useState("");
  const onChangelastName = (e) => {
    setLastName(e.target.value);
  };
  const [username, setUsername] = useState("");
  const onChangeusername = (e) => {
    setUsername(e.target.value);
  };
  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const createUser = async (data) => {
    try {
      const res = axiosBase.post("/accounts/signup", data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e) => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setPassword("");

    e.preventDefault();
    const regData = {
      firstName: firstName,
      email: email,
      password: password,
      username: username,
      lastName: lastName,
    };
    createUser(regData);
    console.log(regData)
    navigate('/login')

  };
  return (
    <>

    <div className="login-">
      <form>
    
      <input
        type="text"
        value={firstName}
        onChange={onChangefirstName}
        name="firstName"
        placeholder="firstName"
      />
      <input
        type="text"
        value={lastName}
        onChange={onChangelastName}
        name="lastName"
        placeholder="lastName"
      />
      <input
        type="email"
        value={email}
        onChange={onChangeEmail}
        name="email"
        placeholder="Email"
      />
      <input
        type="text"
        value={username}
        onChange={onChangeusername}
        name="username"
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={onChangePassword}
        name="password"
        placeholder="Password"
      />
      <button className="user-auth" onClick={(e) => onSubmit(e)} type="submit">
        Submit
      </button>
      <p>Already have an account? <span>Login</span> </p>
    </form>

    </div>
  
    </>
    
    
  );
}
