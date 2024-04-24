import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import {
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "../gql/graphql";
import { useMutation } from "urql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { handleRequestErrors } from "../utils/handleRequestErrors";

const ForgotPassword: React.FC<{}> = () => {
  const [forgotPasswordResult, forgotPassword] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgotPassword(values);

          if (response.data?.forgotPassword) {
            setComplete(true);
            return;
          }
          const errorResponse = handleRequestErrors(response.error);
          errorResponse && setErrors(errorResponse);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box textAlign="center">
              We've sent an email to you with instructions on how to reset your
              password. Check your mailbox! (This can take up a few minutes)
            </Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
              <Button
                type="submit"
                mt={4}
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Request password change
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
