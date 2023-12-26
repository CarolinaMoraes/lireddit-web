import React from "react";
import { Formik, Form } from "formik";
import { Button, Box, useToast } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useMutation } from "urql";
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
} from "../gql/graphql";
import { handleRequestErrors } from "../utils/handleRequestErrors";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [registerUserResult, registerUser] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await registerUser(values);

          if (response.data?.register) router.push("/");
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
