import React from "react";
import { Formik, Form } from "formik";
import { Button, Box } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation } from "urql";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from "../gql/graphql";
import { handleRequestErrors } from "../utils/handleRequestErrors";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [loginResult, login] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  const checkErrorResponseAndSetErrors = (errorResponse, setErrors) => {
    if(!errorResponse) return;

    // checks if the error response is validating username or email, if it is:
    // change the property name to usernameOrEmail to bind the errors correctly to the InputField
    if ("username" in errorResponse || "email" in errorResponse) {
      errorResponse.usernameOrEmail =
        errorResponse.username || errorResponse.email;
    }
    setErrors(errorResponse);
  };

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login) {
            router.push("/");
          } else {
            const errorResponse = handleRequestErrors(response.error);
            checkErrorResponseAndSetErrors(errorResponse, setErrors);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or email"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
