import React, { useState } from "react";
//import { AuthProvider } from "../context/AuthContext";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
//import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainView from "./MainView";

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
