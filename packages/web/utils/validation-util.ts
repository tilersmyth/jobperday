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

  // Register errors (display at input level)
  if (message === 'register_error') {
    return extensions.exception.errors;
  }

  // Login error (display at form level)
  return { message };
};
