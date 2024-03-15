import React from "react";
import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useQuery } from "urql";
import {
  GetPostsDocument,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "../gql/graphql";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const [{ data, fetching }, reexecuteQuery] = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >({ query: GetPostsDocument });

  return (
    <>
      <Navbar />
      <h1>Hello World</h1>
      <br />
      <ul>
        {data?.getPosts.map((post) => (
          <li key={post?.id}>{post?.title}</li>
        ))}
      </ul>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
