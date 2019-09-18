import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddJobInstanceAddressInput = {
  companySlug: Scalars['String'];
  instanceId: Scalars['ID'];
  address: AddressInput;
};

export type AddJobInstanceInput = {
  companySlug: Scalars['String'];
  jobId: Scalars['ID'];
  instance: JobInstanceInput;
};

export type AddressInput = {
  phone?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type CompanyDto = {
  __typename?: 'CompanyDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
};

export type CompanyProfileInput = {
  profile_image: Scalars['String'];
  cover_image: Scalars['String'];
  about: Scalars['String'];
  business_type: Scalars['String'];
};

export type CoordsInput = {
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type CreateCompanyAddressInput = {
  companySlug: Scalars['String'];
  address: AddressInput;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
};

export type CreateCompanyProfileInput = {
  companySlug: Scalars['String'];
  profile: CompanyProfileInput;
};

export type CreateJobInput = {
  companySlug: Scalars['String'];
  job: JobInput;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type JobDto = {
  __typename?: 'JobDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  keywords: Array<Scalars['String']>;
  instances: Array<JobInstanceDto>;
};

export type JobInput = {
  name: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  keywords?: Maybe<Array<Scalars['String']>>;
};

export type JobInstanceDto = {
  __typename?: 'JobInstanceDto';
  id: Scalars['ID'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  pay_rate: Scalars['Int'];
  total_openings: Scalars['Int'];
  remaining_openings: Scalars['Int'];
  apply_deadline: Scalars['DateTime'];
  keywords: Array<Scalars['String']>;
};

export type JobInstanceInput = {
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  pay_rate: Scalars['String'];
  total_openings: Scalars['Int'];
  apply_deadline: Scalars['DateTime'];
};

export type LocationInput = {
  locality: Scalars['String'];
  coords: CoordsInput;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MeSessionDto = {
  __typename?: 'MeSessionDto';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  realm: Scalars['String'];
  is_verified: Scalars['Boolean'];
  setup: Array<Scalars['String']>;
  created_at: Scalars['DateTime'];
  search?: Maybe<SearchLocationDto>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserDto;
  login: UserDto;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  createCompany: CompanyDto;
  createCompanyProfile: Scalars['Boolean'];
  createCompanyAddress: Scalars['Boolean'];
  createJob: JobDto;
  addJobInstance: Scalars['Boolean'];
  addJobInstanceAddress: Scalars['Boolean'];
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};

export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};

export type MutationCreateCompanyProfileArgs = {
  input: CreateCompanyProfileInput;
};

export type MutationCreateCompanyAddressArgs = {
  input: CreateCompanyAddressInput;
};

export type MutationCreateJobArgs = {
  input: CreateJobInput;
};

export type MutationAddJobInstanceArgs = {
  input: AddJobInstanceInput;
};

export type MutationAddJobInstanceAddressArgs = {
  input: AddJobInstanceAddressInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<MeSessionDto>;
  allUsers: Array<UserDto>;
  userLocation?: Maybe<SearchLocationDto>;
  search: SearchDto;
  test: Scalars['Boolean'];
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type RegisterInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SearchCoordsDto = {
  __typename?: 'SearchCoordsDto';
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type SearchDto = {
  __typename?: 'SearchDto';
  count: Scalars['Int'];
  results: Array<SearchResultsDto>;
};

export type SearchInput = {
  search: Scalars['String'];
  location: LocationInput;
  options: SearchOptionsInput;
  pagination: SearchPaginationInput;
};

export type SearchLocationDto = {
  __typename?: 'SearchLocationDto';
  locality: Scalars['String'];
  coords: SearchCoordsDto;
};

export type SearchOptionsInput = {
  radius: Scalars['Int'];
  pay_rate: Scalars['Int'];
};

export type SearchPaginationInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type SearchResultsDto = {
  __typename?: 'SearchResultsDto';
  job: JobDto;
  rank: Scalars['Float'];
  isTypeOf: Scalars['String'];
};

export type UserDto = {
  __typename?: 'UserDto';
  id: Scalars['ID'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  realm: Scalars['String'];
  is_verified: Scalars['Boolean'];
  setup: Array<Scalars['String']>;
  created_at: Scalars['DateTime'];
};
export type ForgotPasswordMutationVariables = {
  email: Scalars['String'];
};

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'forgotPassword'
>;

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserDto' } & Pick<
    UserDto,
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'realm'
    | 'is_verified'
    | 'setup'
  >;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type RegisterMutationVariables = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserDto' } & Pick<
    UserDto,
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'realm'
    | 'is_verified'
    | 'setup'
  >;
};

export type UserLocationQueryVariables = {};

export type UserLocationQuery = { __typename?: 'Query' } & {
  userLocation: Maybe<
    { __typename?: 'SearchLocationDto' } & Pick<
      SearchLocationDto,
      'locality'
    > & {
        coords: { __typename?: 'SearchCoordsDto' } & Pick<
          SearchCoordsDto,
          'lat' | 'lng'
        >;
      }
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me: Maybe<
    { __typename?: 'MeSessionDto' } & Pick<
      MeSessionDto,
      | 'id'
      | 'first_name'
      | 'last_name'
      | 'email'
      | 'realm'
      | 'is_verified'
      | 'setup'
    > & {
        search: Maybe<
          { __typename?: 'SearchLocationDto' } & Pick<
            SearchLocationDto,
            'locality'
          > & {
              coords: { __typename?: 'SearchCoordsDto' } & Pick<
                SearchCoordsDto,
                'lng' | 'lat'
              >;
            }
        >;
      }
  >;
};

export type SearchQueryVariables = {
  input: SearchInput;
};

export type SearchQuery = { __typename?: 'Query' } & {
  search: { __typename?: 'SearchDto' } & Pick<SearchDto, 'count'> & {
      results: Array<
        { __typename?: 'SearchResultsDto' } & Pick<SearchResultsDto, 'rank'> & {
            job: { __typename?: 'JobDto' } & Pick<JobDto, 'name'>;
          }
      >;
    };
};

export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(input: { email: $email })
  }
`;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export type ForgotPasswordComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >,
  'mutation'
>;

export const ForgotPasswordComponent = (
  props: ForgotPasswordComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
    mutation={ForgotPasswordDocument}
    {...props}
  />
);

export type ForgotPasswordProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
> &
  TChildProps;
export function withForgotPassword<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    ForgotPasswordProps<TChildProps>
  >(ForgotPasswordDocument, {
    alias: 'withForgotPassword',
    ...operationOptions,
  });
}
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<
  ForgotPasswordMutation
>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      id
      first_name
      last_name
      email
      realm
      is_verified
      setup
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  LoginMutation,
  LoginMutationVariables
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: 'withLogin',
    ...operationOptions,
  });
}
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
  'mutation'
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  LogoutMutation,
  LogoutMutationVariables
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: 'withLogout',
    ...operationOptions,
  });
}
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
      }
    ) {
      id
      first_name
      last_name
      email
      realm
      is_verified
      setup
    }
  }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;
export type RegisterComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
  'mutation'
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  RegisterMutation,
  RegisterMutationVariables
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: 'withRegister',
    ...operationOptions,
  });
}
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UserLocationDocument = gql`
  query UserLocation {
    userLocation {
      locality
      coords {
        lat
        lng
      }
    }
  }
`;
export type UserLocationComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserLocationQuery,
    UserLocationQueryVariables
  >,
  'query'
>;

export const UserLocationComponent = (props: UserLocationComponentProps) => (
  <ApolloReactComponents.Query<UserLocationQuery, UserLocationQueryVariables>
    query={UserLocationDocument}
    {...props}
  />
);

export type UserLocationProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  UserLocationQuery,
  UserLocationQueryVariables
> &
  TChildProps;
export function withUserLocation<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserLocationQuery,
    UserLocationQueryVariables,
    UserLocationProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserLocationQuery,
    UserLocationQueryVariables,
    UserLocationProps<TChildProps>
  >(UserLocationDocument, {
    alias: 'withUserLocation',
    ...operationOptions,
  });
}
export type UserLocationQueryResult = ApolloReactCommon.QueryResult<
  UserLocationQuery,
  UserLocationQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      first_name
      last_name
      email
      realm
      is_verified
      setup
      search {
        locality
        coords {
          lng
          lat
        }
      }
    }
  }
`;
export type MeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>,
  'query'
>;

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables>
    query={MeDocument}
    {...props}
  />
);

export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  MeQuery,
  MeQueryVariables
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: 'withMe',
    ...operationOptions,
  });
}
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const SearchDocument = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        job {
          name
        }
      }
    }
  }
`;
export type SearchComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    SearchQuery,
    SearchQueryVariables
  >,
  'query'
> &
  ({ variables: SearchQueryVariables; skip?: boolean } | { skip: boolean });

export const SearchComponent = (props: SearchComponentProps) => (
  <ApolloReactComponents.Query<SearchQuery, SearchQueryVariables>
    query={SearchDocument}
    {...props}
  />
);

export type SearchProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  SearchQuery,
  SearchQueryVariables
> &
  TChildProps;
export function withSearch<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SearchQuery,
    SearchQueryVariables,
    SearchProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    SearchQuery,
    SearchQueryVariables,
    SearchProps<TChildProps>
  >(SearchDocument, {
    alias: 'withSearch',
    ...operationOptions,
  });
}
export type SearchQueryResult = ApolloReactCommon.QueryResult<
  SearchQuery,
  SearchQueryVariables
>;
