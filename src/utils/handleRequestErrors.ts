import { createStandaloneToast } from "@chakra-ui/react";
import { CombinedError } from "urql";

enum GraphqlCustomErrorCode {
  CONFLICT = "CONFLICT",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
}
export const toErrorMap = (errors: CombinedError): Record<string, string> => {
  const errorMap: Record<string, string> = {};

  if ("graphQLErrors" in errors) {
    const validations = errors.graphQLErrors[0]?.extensions?.validations;

    if (Array.isArray(validations)) {
      validations.forEach(({ property, constraints }) => {
        errorMap[property] = constraints.join(", ");
      });
    }
  }
  return errorMap;
};

interface DefaultServerErrorMessage {
  title?: string;
  description?: string;
}

export const handleRequestErrors = (
  errors: CombinedError,
  defaultError: DefaultServerErrorMessage = {
    title: "Error",
    description: "Something went wrong",
  }
): Record<string, string> | void => {
  const { toast } = createStandaloneToast();

  if (errors.networkError) {
    toast({
      title: defaultError.title,
      description: defaultError.description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  if ("graphQLErrors" in errors) {
    return toErrorMap(errors);
  }
};
