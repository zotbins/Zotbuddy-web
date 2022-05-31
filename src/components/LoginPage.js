import React, { useState } from "react";

import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { currentUser } = useAuth();
  return (
    //<AuthProvider>
    <>
      <LoginForm />
      {console.log("Current user: " + currentUser)}
    </>

    //</AuthProvider>
  );
};

export default LoginPage;
