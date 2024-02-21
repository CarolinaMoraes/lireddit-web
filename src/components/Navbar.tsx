"use client";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { useMutation, useQuery } from "urql";
import {
  LogoutDocument,
  LogoutMutation,
  MeDocument,
  MeQuery,
  MeQueryVariables,
} from "../gql/graphql";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] =
    useMutation<LogoutMutation>(LogoutDocument);

  const [{ data, fetching }, reexecuteQuery] = useQuery<
    MeQuery,
    MeQueryVariables
  >({
    query: MeDocument,
  });

  let body = null;

  // data is loading
  if (fetching) {
  }
  // user not logged in
  else if (!data.me) {
    body = (
      <>
        <Link as={NextLink} href="/login" mr={3}>
          login
        </Link>
        <Link as={NextLink} href="/register">
          register
        </Link>
      </>
    );

    // user logged in
  } else {
    console.log(data);
    body = (
      <Flex align="center">
        <Box mr={5}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          onClick={() => logout()}
          color="white"
          variant="link"
        >
          {" "}
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex p={6} bg="green.500">
      <Box color="white" ml={"auto"}>
        {body}
      </Box>
    </Flex>
  );
};

export default Navbar;
