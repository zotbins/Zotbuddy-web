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
//import { useAuth } from "../context/AuthContext";

//TODO routing
//TODO signup function handleSubmit

export default function SignUpForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const positionRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    //empty fields are already handled
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setErrorMsg("Passwords Do Not Match");
    }
    setErrorMsg("");

    //loading state is used to prevent spaming of signup button
    setIsLoading(true);

    //signup with firebase auth
    //signUp(emailRef.current.value, passwordRef.current.value);

    setIsLoading(false);
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <div className="centerCard">
        <Box w="400px">
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <Heading as="h2" size="xl">
                Sign Up
              </Heading>
              {errorMsg && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMsg}
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" placeholder="Name" ref={nameRef} />
              </FormControl>

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
                <FormLabel htmlFor="email">Position at UCI Dining</FormLabel>
                <Select
                  id="position"
                  placeholder="Select Option"
                  ref={positionRef}
                >
                  <option value="position1">position1</option>
                  <option value="position2">position2</option>
                  <option value="position3">position3</option>
                </Select>
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
              <FormControl isRequired>
                <FormLabel htmlFor="confirm-password">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  ref={passwordConfirmRef}
                />
              </FormControl>
              <Button
                width="half"
                mt={4}
                variant="outline"
                type="submit"
                disabled={isLoading}
              >
                Sign Up
              </Button>

              <Text>
                Already have an account?{" "}
                <Link href="" color="green.600">
                  Log In
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </div>
    </Flex>
  );
}
