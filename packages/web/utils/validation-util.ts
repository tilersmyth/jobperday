import { GraphQLError } from 'graphql';

interface ValidationError extends Error {
  graphQLErrors: GraphQLError[];
}

interface Validation {
  [key: string]: string;
}

export const serverValidationError = (
  errors: ValidationError,
): Validation | null => {
  if (!errors.graphQLErrors[0]) {
    return null;
  }

  const { extensions, message } = errors.graphQLErrors[0];

  if (!extensions) {
    return null;
  }

  // Field level errors
  if (message === 'input_error') {
    return extensions.exception;
  }

  // Form level errors
  return { message };
};
