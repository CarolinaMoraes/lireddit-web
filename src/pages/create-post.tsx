import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useMutation, useQuery } from "urql";
import InputField from "../components/InputField";
import { CreatePostDocument, CreatePostMutation, CreatePostMutationVariables, MeDocument, MeQuery, MeQueryVariables } from "../gql/graphql";
import { handleRequestErrors } from "../utils/handleRequestErrors";
// import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPostResult, createPost] = useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({ postInput: values });

          if (response.data?.createPost) {
            router.push("/");
          } else {
            const errorResponse = handleRequestErrors(response.error);
            if (errorResponse) setErrors(errorResponse);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              type="text"
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="Tell us what is up"
                label="Your post"
                textarea
              />
            </Box>
            <Button
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
