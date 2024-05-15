import { Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { useQuery } from "urql";
import Layout from "../components/Layout";
import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "../gql/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [{ data, fetching }, reexecuteQuery] = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >({ query: GetPostsDocument });

  return (
    <Layout>
      <Link as={NextLink} href="/create-post">Create post</Link>
      <br />
      <ul>
        {data?.getPosts.map((post) => (
          <li key={post?.id}>{post?.title}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
