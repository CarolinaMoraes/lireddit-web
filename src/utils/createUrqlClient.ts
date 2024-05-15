import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig } from "next-urql";
import { Exchange, fetchExchange } from "urql";
import { pipe, tap } from 'wonka';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../gql/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";

export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap((response) => {
      console.log(response);
      if (response.error && response.error?.message.toLowerCase().includes("not authenticated")) {
        Router.replace("/login");
      }
    })
  );
};

const mutationUpdates = {
  logout: (_result, _args, cache, _info) => {
    betterUpdateQuery<LogoutMutation, MeQuery>(
      cache,
      { query: MeDocument },
      _result,
      () => ({ me: null })
    );
  },
  login: (_result, _args, cache, _info) => {
    betterUpdateQuery<LoginMutation, MeQuery>(
      cache,
      { query: MeDocument },
      _result,
      (result, query) => {
        if (_info.error) {
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
        if (_info.error) {
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
};

export const createUrqlClient: NextUrqlClientConfig = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
    errorExchange,
    cacheExchange({
      updates: {
        Mutation: mutationUpdates,
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});
