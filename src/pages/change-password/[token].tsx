import React, { useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import Wrapper from "../../components/Wrapper";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { useMutation } from "urql";
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "../../gql/graphql";
import { handleRequestErrors } from "../../utils/handleRequestErrors";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState("");
  const [changePasswordResult, changePassword] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // If passwords don't match, don't go forward
          if (values.newPassword !== values.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
          }

          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });

          // Successful change
          if (response?.data?.changePassword) {
            router.push("/");
            return;
          } else {
            // Unsuccessful change
            const errorResponse = handleRequestErrors(response.error);
            if (errorResponse) {
              setErrors(errorResponse);
              if ("token" in errorResponse) setTokenError(errorResponse.token);
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            <Box mt={4}>
              <InputField
                name="confirmPassword"
                placeholder="confirm password"
                label="Confirm Password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Alert mt={2} status="error">
                <AlertIcon />
                <Box>
                  <AlertTitle>{tokenError}</AlertTitle>
                  <AlertDescription>
                    If you still need to change it,{" "}
                    <Link color="red.600" as={NextLink} href="/forgot-password">
                      click here to request it
                    </Link>
                  </AlertDescription>
                </Box>
              </Alert>
            ) : null}
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
