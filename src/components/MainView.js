import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import TabBar from "./TabBar";
import HomeView from "../screens/Home/HomeView";
import { useAuth } from "../context/AuthContext";
import ProblemRouter from "../screens/Problem/ProblemRouter";
import EventRouter from "../screens/Event/EventRouter";

const MainView = (props) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  function handleLogout() {
    logout();
    history.push("/");
  }

  return (
    <Flex direction={"column"}>
      <TabBar />
      <HomeView />

      {currentUser.email}
      <div>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Flex>
  );
};

export default MainView;
