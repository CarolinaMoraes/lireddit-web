import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import NextLink from "next/link";
import { useQuery } from "urql";
import { MeDocument, MeQuery, MeQueryVariables } from "../gql/graphql";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
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
        <NextLink href="/login">
          <Link mr={3}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );

    // user logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={5}>{data.me.username}</Box>
        <Button color="white" variant="link">
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
