import { useQuery } from "urql";
import { MeDocument, MeQuery, MeQueryVariables } from "../gql/graphql";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useIsAuth = () => {
    const [{ data, fetching }] = useQuery<MeQuery, MeQueryVariables>({ query: MeDocument });
    const router = useRouter();

    useEffect(() => {
        if (!fetching && !data?.me) {
            router.replace("/login");
        }
    }, [fetching, data, router]);
}