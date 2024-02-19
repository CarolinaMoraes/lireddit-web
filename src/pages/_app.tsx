import { ChakraProvider } from "@chakra-ui/react";
import { Provider, createClient, fetchExchange } from "urql";

import { Cache, QueryInput, cacheExchange } from "@urql/exchange-graphcache";

import theme from "../theme";
import { AppProps } from "next/app";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../gql/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  fn: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => fn(result, data as any) as any
  );
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, _args, cache, _info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (_info.error !== "undefined") {
                  return query;
                }

                return {
                  me: {
                    username: result.login.username,
                    id: result.login.id,
                  },
                };
              }
            );
          },

          register: (_result, _args, cache, _info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (_info.error !== "undefined") {
                  return query;
                }

                return {
                  me: {
                    username: result.register.username,
                    id: result.register.id,
                  },
                };
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
