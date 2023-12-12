import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation, useQuery } from "urql";
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "../gql/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [registerUserResult, registerUser] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await registerUser(values);
          console.log(response);
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
