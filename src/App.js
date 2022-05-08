import React from "react";
import firebase from "firebase";
import { chakraTheme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { firebaseConfig } from "./config";
import { BrowserRouter } from "react-router-dom";
import MainView from "./components/MainView";
import SignUpPage from "./components/SignUpPage";

var app;
var auth;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  auth = app.auth();
}

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <BrowserRouter forceRefresh={true}>
        <SignUpPage auth={auth} />
      </BrowserRouter>
    </ChakraProvider>
  );
};
//<MainView />
export default App;
