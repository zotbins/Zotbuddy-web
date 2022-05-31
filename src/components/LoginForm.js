import React, { useRef, useState } from "react";
import {
  Box,
  Text,
  Select,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Flex,
  Button,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import "./SignUp.css";
import { useAuth } from "../context/AuthContext";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MainView from "./MainView";
//TODO routing
//TODO signup function handleSubmit

export default function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    //empty fields are already handled

    setErrorMsg("");

    try {
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      // console.log("Logged into:");
      //console.log(emailRef.current.value);
      history.push("/");
    } catch {
      setErrorMsg("Incorrect Email or Password");
    }

    setIsLoading(false);
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <div className="centerCard">
        <Box w="400px" marginTop="34%" marginBottom="34%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <Heading as="h2" size="xl">
                Login
              </Heading>
              {errorMsg && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMsg}
                </Alert>
              )}

              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  ref={emailRef}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </FormControl>

              <Button
                width="half"
                mt={4}
                variant="outline"
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>

              <Text>
                Don't have an account?{" "}
                <Link href="./signup" color="green.600">
                  Sign Up
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </div>
    </Flex>
  );
}
