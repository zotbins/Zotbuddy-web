import React, { useState } from "react";
import { AuthProvider } from "../context/AuthContext";

import SignUpForm from "./SignUpForm";
//import { AuthProvider } from "../context/AuthContext";

const SignUpPage = () => {
  return (
    //<AuthProvider>
    <SignUpForm />
    //</AuthProvider>
  );
};

export default SignUpPage;
