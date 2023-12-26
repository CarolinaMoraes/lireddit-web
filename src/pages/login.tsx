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

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [loginResult, login] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LoginDocument);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);

          if (response.data?.login) router.push("/");
          else {
            const errorResponse = handleRequestErrors(response.error);
            if (errorResponse) setErrors(errorResponse);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
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

export default Login;
