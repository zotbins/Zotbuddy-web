import React from "react";
import firebase from "firebase";
import { chakraTheme } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { firebaseConfig } from "./config";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainView from "./components/MainView";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import AuthProvider from "./context/AuthContext";
import ProblemRouter from "./screens/Problem/ProblemRouter";
import EventRouter from "./screens/Event/EventRouter";
import { Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
/*var app;
var auth;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  auth = app.auth();
}*/

const App = () => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={MainView} />
            <Route path="/login" component={LoginPage} />
            <Route path="/problem" component={ProblemRouter} />
            <Route path="/event" component={EventRouter} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};
//<MainView />
/*<BrowserRouter forceRefresh={true}>
    <SignUpPage auth={auth} />
  </BrowserRouter>*/
export default App;
