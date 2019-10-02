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

export type CompanyMemberDto = {
  __typename?: 'CompanyMemberDto';
  id: Scalars['ID'];
  role: Scalars['String'];
  user: UserDto;
};

export type CompanyMemberInput = {
  userId?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  role: Scalars['String'];
};

export type CompanyProfileInput = {
  profile_image?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  about: Scalars['String'];
  business_type: Scalars['String'];
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

export type CreateCompanyProfileDto = {
  __typename?: 'CreateCompanyProfileDto';
  id: Scalars['ID'];
  business_type: Scalars['String'];
  about: Scalars['String'];
  profile_image: Scalars['String'];
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
  createCompanyProfile: CreateCompanyProfileDto;
  updateCreateCompanyProfile: CreateCompanyProfileDto;
  createCompanyAddMembers: Scalars['Boolean'];
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
  companySlug: Scalars['String'];
};

export type MutationCreateCompanyProfileArgs = {
  input: CompanyProfileInput;
  companySlug: Scalars['String'];
};

export type MutationUpdateCreateCompanyProfileArgs = {
  input: UpdateProfileInput;
  companySlug: Scalars['String'];
};

export type MutationCreateCompanyAddMembersArgs = {
  input?: Maybe<Array<CompanyMemberInput>>;
  companySlug: Scalars['String'];
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
  findCreateCompanyProfile?: Maybe<CreateCompanyProfileDto>;
  findCreateCompanyMembers: Array<CompanyMemberDto>;
  search: SearchDto;
  test: Scalars['Boolean'];
};

export type QueryFindCompanyArgs = {
  companySlug: Scalars['String'];
};

export type QueryGenerateCompanySlugArgs = {
  name: Scalars['String'];
};

export type QueryCompanySlugAvailableArgs = {
  name: Scalars['String'];
};

export type QueryFindCreateCompanyArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCreateCompanyProfileArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCreateCompanyMembersArgs = {
  companySlug: Scalars['String'];
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
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateCompanyAddressInput>;
};

export type UpdateProfileInput = {
  id: Scalars['ID'];
  profile_image?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  business_type?: Maybe<Scalars['String']>;
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

export type CreateCompanyAddMembersMutationVariables = {
  companySlug: Scalars['String'];
  input?: Maybe<Array<CompanyMemberInput>>;
};

export type CreateCompanyAddMembersMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'createCompanyAddMembers'>;

export type CreateCompanyProfileMutationVariables = {
  companySlug: Scalars['String'];
  input: CompanyProfileInput;
};

export type CreateCompanyProfileMutation = { __typename?: 'Mutation' } & {
  createCompanyProfile: { __typename?: 'CreateCompanyProfileDto' } & Pick<
    CreateCompanyProfileDto,
    'id'
  >;
};

export type UpdateCreateCompanyProfileMutationVariables = {
  companySlug: Scalars['String'];
  input: UpdateProfileInput;
};

export type UpdateCreateCompanyProfileMutation = { __typename?: 'Mutation' } & {
  updateCreateCompanyProfile: { __typename?: 'CreateCompanyProfileDto' } & Pick<
    CreateCompanyProfileDto,
    'id' | 'about' | 'business_type' | 'profile_image'
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
  companySlug: Scalars['String'];
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
  companySlug: Scalars['String'];
};

export type FindCompanyQuery = { __typename?: 'Query' } & {
  findCompany: { __typename?: 'CompanyDto' } & Pick<
    CompanyDto,
    'id' | 'slug' | 'name' | 'setup_stage' | 'setup_complete'
  >;
};

export type FindCreateCompanyMembersQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCreateCompanyMembersQuery = { __typename?: 'Query' } & {
  findCreateCompanyMembers: Array<
    { __typename?: 'CompanyMemberDto' } & Pick<
      CompanyMemberDto,
      'id' | 'role'
    > & {
        user: { __typename?: 'UserDto' } & Pick<
          UserDto,
          'first_name' | 'last_name' | 'email'
        >;
      }
  >;
};

export type FindCreateCompanyProfileQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCreateCompanyProfileQuery = { __typename?: 'Query' } & {
  findCreateCompanyProfile: Maybe<
    { __typename?: 'CreateCompanyProfileDto' } & Pick<
      CreateCompanyProfileDto,
      'id' | 'profile_image' | 'business_type' | 'about'
    >
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
  companySlug: Scalars['String'];
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
export const CreateCompanyAddMembersDocument = gql`
  mutation CreateCompanyAddMembers(
    $companySlug: String!
    $input: [CompanyMemberInput!]
  ) {
    createCompanyAddMembers(companySlug: $companySlug, input: $input)
  }
`;
export type CreateCompanyAddMembersMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyAddMembersMutation,
  CreateCompanyAddMembersMutationVariables
>;
export type CreateCompanyAddMembersComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCompanyAddMembersMutation,
    CreateCompanyAddMembersMutationVariables
  >,
  'mutation'
>;

export const CreateCompanyAddMembersComponent = (
  props: CreateCompanyAddMembersComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreateCompanyAddMembersMutation,
    CreateCompanyAddMembersMutationVariables
  >
    mutation={CreateCompanyAddMembersDocument}
    {...props}
  />
);

export type CreateCompanyAddMembersProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateCompanyAddMembersMutation,
  CreateCompanyAddMembersMutationVariables
> &
  TChildProps;
export function withCreateCompanyAddMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCompanyAddMembersMutation,
    CreateCompanyAddMembersMutationVariables,
    CreateCompanyAddMembersProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCompanyAddMembersMutation,
    CreateCompanyAddMembersMutationVariables,
    CreateCompanyAddMembersProps<TChildProps>
  >(CreateCompanyAddMembersDocument, {
    alias: 'withCreateCompanyAddMembers',
    ...operationOptions,
  });
}
export type CreateCompanyAddMembersMutationResult = ApolloReactCommon.MutationResult<
  CreateCompanyAddMembersMutation
>;
export type CreateCompanyAddMembersMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyAddMembersMutation,
  CreateCompanyAddMembersMutationVariables
>;
export const CreateCompanyProfileDocument = gql`
  mutation CreateCompanyProfile(
    $companySlug: String!
    $input: CompanyProfileInput!
  ) {
    createCompanyProfile(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
export type CreateCompanyProfileMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyProfileMutation,
  CreateCompanyProfileMutationVariables
>;
export type CreateCompanyProfileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCompanyProfileMutation,
    CreateCompanyProfileMutationVariables
  >,
  'mutation'
>;

export const CreateCompanyProfileComponent = (
  props: CreateCompanyProfileComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreateCompanyProfileMutation,
    CreateCompanyProfileMutationVariables
  >
    mutation={CreateCompanyProfileDocument}
    {...props}
  />
);

export type CreateCompanyProfileProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateCompanyProfileMutation,
  CreateCompanyProfileMutationVariables
> &
  TChildProps;
export function withCreateCompanyProfile<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCompanyProfileMutation,
    CreateCompanyProfileMutationVariables,
    CreateCompanyProfileProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCompanyProfileMutation,
    CreateCompanyProfileMutationVariables,
    CreateCompanyProfileProps<TChildProps>
  >(CreateCompanyProfileDocument, {
    alias: 'withCreateCompanyProfile',
    ...operationOptions,
  });
}
export type CreateCompanyProfileMutationResult = ApolloReactCommon.MutationResult<
  CreateCompanyProfileMutation
>;
export type CreateCompanyProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyProfileMutation,
  CreateCompanyProfileMutationVariables
>;
export const UpdateCreateCompanyProfileDocument = gql`
  mutation UpdateCreateCompanyProfile(
    $companySlug: String!
    $input: UpdateProfileInput!
  ) {
    updateCreateCompanyProfile(companySlug: $companySlug, input: $input) {
      id
      about
      business_type
      profile_image
    }
  }
`;
export type UpdateCreateCompanyProfileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCreateCompanyProfileMutation,
  UpdateCreateCompanyProfileMutationVariables
>;
export type UpdateCreateCompanyProfileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCreateCompanyProfileMutation,
    UpdateCreateCompanyProfileMutationVariables
  >,
  'mutation'
>;

export const UpdateCreateCompanyProfileComponent = (
  props: UpdateCreateCompanyProfileComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCreateCompanyProfileMutation,
    UpdateCreateCompanyProfileMutationVariables
  >
    mutation={UpdateCreateCompanyProfileDocument}
    {...props}
  />
);

export type UpdateCreateCompanyProfileProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCreateCompanyProfileMutation,
  UpdateCreateCompanyProfileMutationVariables
> &
  TChildProps;
export function withUpdateCreateCompanyProfile<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCreateCompanyProfileMutation,
    UpdateCreateCompanyProfileMutationVariables,
    UpdateCreateCompanyProfileProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCreateCompanyProfileMutation,
    UpdateCreateCompanyProfileMutationVariables,
    UpdateCreateCompanyProfileProps<TChildProps>
  >(UpdateCreateCompanyProfileDocument, {
    alias: 'withUpdateCreateCompanyProfile',
    ...operationOptions,
  });
}
export type UpdateCreateCompanyProfileMutationResult = ApolloReactCommon.MutationResult<
  UpdateCreateCompanyProfileMutation
>;
export type UpdateCreateCompanyProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCreateCompanyProfileMutation,
  UpdateCreateCompanyProfileMutationVariables
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
  mutation UpdateCreateCompany(
    $companySlug: String!
    $input: UpdateCompanyInput!
  ) {
    updateCreateCompany(companySlug: $companySlug, input: $input) {
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
  query FindCompany($companySlug: String!) {
    findCompany(companySlug: $companySlug) {
      id
      slug
      name
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
export const FindCreateCompanyMembersDocument = gql`
  query FindCreateCompanyMembers($companySlug: String!) {
    findCreateCompanyMembers(companySlug: $companySlug) {
      id
      role
      user {
        first_name
        last_name
        email
      }
    }
  }
`;
export type FindCreateCompanyMembersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCreateCompanyMembersQuery,
    FindCreateCompanyMembersQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCreateCompanyMembersQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCreateCompanyMembersComponent = (
  props: FindCreateCompanyMembersComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCreateCompanyMembersQuery,
    FindCreateCompanyMembersQueryVariables
  >
    query={FindCreateCompanyMembersDocument}
    {...props}
  />
);

export type FindCreateCompanyMembersProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCreateCompanyMembersQuery,
  FindCreateCompanyMembersQueryVariables
> &
  TChildProps;
export function withFindCreateCompanyMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCreateCompanyMembersQuery,
    FindCreateCompanyMembersQueryVariables,
    FindCreateCompanyMembersProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCreateCompanyMembersQuery,
    FindCreateCompanyMembersQueryVariables,
    FindCreateCompanyMembersProps<TChildProps>
  >(FindCreateCompanyMembersDocument, {
    alias: 'withFindCreateCompanyMembers',
    ...operationOptions,
  });
}
export type FindCreateCompanyMembersQueryResult = ApolloReactCommon.QueryResult<
  FindCreateCompanyMembersQuery,
  FindCreateCompanyMembersQueryVariables
>;
export const FindCreateCompanyProfileDocument = gql`
  query FindCreateCompanyProfile($companySlug: String!) {
    findCreateCompanyProfile(companySlug: $companySlug) {
      id
      profile_image
      business_type
      about
    }
  }
`;
export type FindCreateCompanyProfileComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCreateCompanyProfileQuery,
    FindCreateCompanyProfileQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCreateCompanyProfileQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCreateCompanyProfileComponent = (
  props: FindCreateCompanyProfileComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCreateCompanyProfileQuery,
    FindCreateCompanyProfileQueryVariables
  >
    query={FindCreateCompanyProfileDocument}
    {...props}
  />
);

export type FindCreateCompanyProfileProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCreateCompanyProfileQuery,
  FindCreateCompanyProfileQueryVariables
> &
  TChildProps;
export function withFindCreateCompanyProfile<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCreateCompanyProfileQuery,
    FindCreateCompanyProfileQueryVariables,
    FindCreateCompanyProfileProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCreateCompanyProfileQuery,
    FindCreateCompanyProfileQueryVariables,
    FindCreateCompanyProfileProps<TChildProps>
  >(FindCreateCompanyProfileDocument, {
    alias: 'withFindCreateCompanyProfile',
    ...operationOptions,
  });
}
export type FindCreateCompanyProfileQueryResult = ApolloReactCommon.QueryResult<
  FindCreateCompanyProfileQuery,
  FindCreateCompanyProfileQueryVariables
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
  query FindCreateCompany($companySlug: String!) {
    findCreateCompany(companySlug: $companySlug) {
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
