import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
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

export type CompanyAddressDto = {
  __typename?: 'CompanyAddressDto';
  phone: Scalars['String'];
  street: Scalars['String'];
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

export type CompanySlugInput = {
  companySlug: Scalars['String'];
};

export type CoordsInput = {
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type CreateCompanyAddressInput = {
  phone: Scalars['String'];
  street: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type CreateCompanyDto = {
  __typename?: 'CreateCompanyDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
  address: CompanyAddressDto;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  address: CreateCompanyAddressInput;
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
  companyName: Scalars['String'];
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
  createCompany: CreateCompanyDto;
  updateCreateCompany: CreateCompanyDto;
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

export type MutationUpdateCreateCompanyArgs = {
  input: UpdateCompanyInput;
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
  findCompany: CompanyDto;
  generateCompanySlug: Scalars['String'];
  companySlugAvailable?: Maybe<Scalars['String']>;
  findCreateCompany: CreateCompanyDto;
  search: SearchDto;
  test: Scalars['Boolean'];
};

export type QueryFindCompanyArgs = {
  input: CompanySlugInput;
};

export type QueryGenerateCompanySlugArgs = {
  name: Scalars['String'];
};

export type QueryCompanySlugAvailableArgs = {
  name: Scalars['String'];
};

export type QueryFindCreateCompanyArgs = {
  input: CompanySlugInput;
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
};

export type UpdateCompanyAddressInput = {
  phone?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coord_lat?: Maybe<Scalars['Float']>;
  coord_lng?: Maybe<Scalars['Float']>;
};

export type UpdateCompanyInput = {
  companySlug: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateCompanyAddressInput>;
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
export type SearchQueryVariables = {
  input: SearchInput;
};

export type SearchQuery = { __typename?: 'Query' } & {
  search: { __typename?: 'SearchDto' } & Pick<SearchDto, 'count'> & {
      results: Array<
        { __typename?: 'SearchResultsDto' } & Pick<SearchResultsDto, 'rank'> & {
            job: { __typename?: 'JobDto' } & Pick<
              JobDto,
              'id' | 'name' | 'companyName' | 'type'
            > & {
                instances: Array<
                  { __typename?: 'JobInstanceDto' } & Pick<
                    JobInstanceDto,
                    | 'id'
                    | 'start_date'
                    | 'apply_deadline'
                    | 'pay_rate'
                    | 'total_openings'
                  >
                >;
              };
          }
      >;
    };
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

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput;
};

export type CreateCompanyMutation = { __typename?: 'Mutation' } & {
  createCompany: { __typename?: 'CreateCompanyDto' } & Pick<
    CreateCompanyDto,
    'id' | 'slug'
  >;
};

export type UpdateCreateCompanyMutationVariables = {
  input: UpdateCompanyInput;
};

export type UpdateCreateCompanyMutation = { __typename?: 'Mutation' } & {
  updateCreateCompany: { __typename?: 'CreateCompanyDto' } & Pick<
    CreateCompanyDto,
    'id' | 'slug' | 'name'
  > & {
      address: { __typename?: 'CompanyAddressDto' } & Pick<
        CompanyAddressDto,
        | 'phone'
        | 'street'
        | 'street2'
        | 'city'
        | 'state'
        | 'postal_code'
        | 'country'
        | 'coord_lat'
        | 'coord_lng'
      >;
    };
};

export type FindCompanyQueryVariables = {
  input: CompanySlugInput;
};

export type FindCompanyQuery = { __typename?: 'Query' } & {
  findCompany: { __typename?: 'CompanyDto' } & Pick<
    CompanyDto,
    'id' | 'slug' | 'setup_stage' | 'setup_complete'
  >;
};

export type GenerateCompanySlugQueryVariables = {
  name: Scalars['String'];
};

export type GenerateCompanySlugQuery = { __typename?: 'Query' } & Pick<
  Query,
  'generateCompanySlug'
>;

export type CompanySlugAvailableQueryVariables = {
  name: Scalars['String'];
};

export type CompanySlugAvailableQuery = { __typename?: 'Query' } & Pick<
  Query,
  'companySlugAvailable'
>;

export type FindCreateCompanyQueryVariables = {
  input: CompanySlugInput;
};

export type FindCreateCompanyQuery = { __typename?: 'Query' } & {
  findCreateCompany: { __typename?: 'CreateCompanyDto' } & Pick<
    CreateCompanyDto,
    'id' | 'slug' | 'name'
  > & {
      address: { __typename?: 'CompanyAddressDto' } & Pick<
        CompanyAddressDto,
        | 'phone'
        | 'street'
        | 'street2'
        | 'city'
        | 'state'
        | 'postal_code'
        | 'country'
        | 'coord_lat'
        | 'coord_lng'
      >;
    };
};

export const SearchDocument = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        job {
          id
          name
          companyName
          type
          instances {
            id
            start_date
            apply_deadline
            pay_rate
            total_openings
          }
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
export const CreateCompanyDocument = gql`
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      id
      slug
    }
  }
`;
export type CreateCompanyMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>;
export type CreateCompanyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >,
  'mutation'
>;

export const CreateCompanyComponent = (props: CreateCompanyComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateCompanyMutation,
    CreateCompanyMutationVariables
  >
    mutation={CreateCompanyDocument}
    {...props}
  />
);

export type CreateCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
> &
  TChildProps;
export function withCreateCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCompanyMutation,
    CreateCompanyMutationVariables,
    CreateCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCompanyMutation,
    CreateCompanyMutationVariables,
    CreateCompanyProps<TChildProps>
  >(CreateCompanyDocument, {
    alias: 'withCreateCompany',
    ...operationOptions,
  });
}
export type CreateCompanyMutationResult = ApolloReactCommon.MutationResult<
  CreateCompanyMutation
>;
export type CreateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyMutation,
  CreateCompanyMutationVariables
>;
export const UpdateCreateCompanyDocument = gql`
  mutation UpdateCreateCompany($input: UpdateCompanyInput!) {
    updateCreateCompany(input: $input) {
      id
      slug
      name
      address {
        phone
        street
        street2
        city
        state
        postal_code
        country
        coord_lat
        coord_lng
      }
    }
  }
`;
export type UpdateCreateCompanyMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCreateCompanyMutation,
  UpdateCreateCompanyMutationVariables
>;
export type UpdateCreateCompanyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCreateCompanyMutation,
    UpdateCreateCompanyMutationVariables
  >,
  'mutation'
>;

export const UpdateCreateCompanyComponent = (
  props: UpdateCreateCompanyComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCreateCompanyMutation,
    UpdateCreateCompanyMutationVariables
  >
    mutation={UpdateCreateCompanyDocument}
    {...props}
  />
);

export type UpdateCreateCompanyProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCreateCompanyMutation,
  UpdateCreateCompanyMutationVariables
> &
  TChildProps;
export function withUpdateCreateCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCreateCompanyMutation,
    UpdateCreateCompanyMutationVariables,
    UpdateCreateCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCreateCompanyMutation,
    UpdateCreateCompanyMutationVariables,
    UpdateCreateCompanyProps<TChildProps>
  >(UpdateCreateCompanyDocument, {
    alias: 'withUpdateCreateCompany',
    ...operationOptions,
  });
}
export type UpdateCreateCompanyMutationResult = ApolloReactCommon.MutationResult<
  UpdateCreateCompanyMutation
>;
export type UpdateCreateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCreateCompanyMutation,
  UpdateCreateCompanyMutationVariables
>;
export const FindCompanyDocument = gql`
  query FindCompany($input: CompanySlugInput!) {
    findCompany(input: $input) {
      id
      slug
      setup_stage
      setup_complete
    }
  }
`;
export type FindCompanyComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanyQuery,
    FindCompanyQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanyQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanyComponent = (props: FindCompanyComponentProps) => (
  <ApolloReactComponents.Query<FindCompanyQuery, FindCompanyQueryVariables>
    query={FindCompanyDocument}
    {...props}
  />
);

export type FindCompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindCompanyQuery,
  FindCompanyQueryVariables
> &
  TChildProps;
export function withFindCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanyQuery,
    FindCompanyQueryVariables,
    FindCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanyQuery,
    FindCompanyQueryVariables,
    FindCompanyProps<TChildProps>
  >(FindCompanyDocument, {
    alias: 'withFindCompany',
    ...operationOptions,
  });
}
export type FindCompanyQueryResult = ApolloReactCommon.QueryResult<
  FindCompanyQuery,
  FindCompanyQueryVariables
>;
export const GenerateCompanySlugDocument = gql`
  query GenerateCompanySlug($name: String!) {
    generateCompanySlug(name: $name)
  }
`;
export type GenerateCompanySlugComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GenerateCompanySlugQuery,
    GenerateCompanySlugQueryVariables
  >,
  'query'
> &
  (
    | { variables: GenerateCompanySlugQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GenerateCompanySlugComponent = (
  props: GenerateCompanySlugComponentProps,
) => (
  <ApolloReactComponents.Query<
    GenerateCompanySlugQuery,
    GenerateCompanySlugQueryVariables
  >
    query={GenerateCompanySlugDocument}
    {...props}
  />
);

export type GenerateCompanySlugProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  GenerateCompanySlugQuery,
  GenerateCompanySlugQueryVariables
> &
  TChildProps;
export function withGenerateCompanySlug<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GenerateCompanySlugQuery,
    GenerateCompanySlugQueryVariables,
    GenerateCompanySlugProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GenerateCompanySlugQuery,
    GenerateCompanySlugQueryVariables,
    GenerateCompanySlugProps<TChildProps>
  >(GenerateCompanySlugDocument, {
    alias: 'withGenerateCompanySlug',
    ...operationOptions,
  });
}
export type GenerateCompanySlugQueryResult = ApolloReactCommon.QueryResult<
  GenerateCompanySlugQuery,
  GenerateCompanySlugQueryVariables
>;
export const CompanySlugAvailableDocument = gql`
  query CompanySlugAvailable($name: String!) {
    companySlugAvailable(name: $name)
  }
`;
export type CompanySlugAvailableComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CompanySlugAvailableQuery,
    CompanySlugAvailableQueryVariables
  >,
  'query'
> &
  (
    | { variables: CompanySlugAvailableQueryVariables; skip?: boolean }
    | { skip: boolean });

export const CompanySlugAvailableComponent = (
  props: CompanySlugAvailableComponentProps,
) => (
  <ApolloReactComponents.Query<
    CompanySlugAvailableQuery,
    CompanySlugAvailableQueryVariables
  >
    query={CompanySlugAvailableDocument}
    {...props}
  />
);

export type CompanySlugAvailableProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  CompanySlugAvailableQuery,
  CompanySlugAvailableQueryVariables
> &
  TChildProps;
export function withCompanySlugAvailable<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CompanySlugAvailableQuery,
    CompanySlugAvailableQueryVariables,
    CompanySlugAvailableProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CompanySlugAvailableQuery,
    CompanySlugAvailableQueryVariables,
    CompanySlugAvailableProps<TChildProps>
  >(CompanySlugAvailableDocument, {
    alias: 'withCompanySlugAvailable',
    ...operationOptions,
  });
}
export type CompanySlugAvailableQueryResult = ApolloReactCommon.QueryResult<
  CompanySlugAvailableQuery,
  CompanySlugAvailableQueryVariables
>;
export const FindCreateCompanyDocument = gql`
  query FindCreateCompany($input: CompanySlugInput!) {
    findCreateCompany(input: $input) {
      id
      slug
      name
      address {
        phone
        street
        street2
        city
        state
        postal_code
        country
        coord_lat
        coord_lng
      }
    }
  }
`;
export type FindCreateCompanyComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCreateCompanyQuery,
    FindCreateCompanyQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCreateCompanyQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCreateCompanyComponent = (
  props: FindCreateCompanyComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCreateCompanyQuery,
    FindCreateCompanyQueryVariables
  >
    query={FindCreateCompanyDocument}
    {...props}
  />
);

export type FindCreateCompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindCreateCompanyQuery,
  FindCreateCompanyQueryVariables
> &
  TChildProps;
export function withFindCreateCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCreateCompanyQuery,
    FindCreateCompanyQueryVariables,
    FindCreateCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCreateCompanyQuery,
    FindCreateCompanyQueryVariables,
    FindCreateCompanyProps<TChildProps>
  >(FindCreateCompanyDocument, {
    alias: 'withFindCreateCompany',
    ...operationOptions,
  });
}
export type FindCreateCompanyQueryResult = ApolloReactCommon.QueryResult<
  FindCreateCompanyQuery,
  FindCreateCompanyQueryVariables
>;
