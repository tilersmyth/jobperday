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
  /** Upload custom scalar type */
  Upload: any;
};

export type AddJobPostingAddressInput = {
  addressId?: Maybe<Scalars['ID']>;
  newAddress?: Maybe<AddressInput>;
};

export type AddJobPostingInput = {
  jobId: Scalars['ID'];
  address: AddJobPostingAddressInput;
  applicationId: Scalars['ID'];
  posting: JobPostingInput;
};

export type AddressInput = {
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type ApplicationDto = {
  __typename?: 'ApplicationDto';
  id: Scalars['ID'];
  title: Scalars['String'];
  fields: Array<ApplicationFieldDto>;
};

export type ApplicationFieldDto = {
  __typename?: 'ApplicationFieldDto';
  id: Scalars['ID'];
  question: Scalars['String'];
  required: Scalars['Boolean'];
  type: ApplicationFieldsEnum;
  options: Array<Scalars['String']>;
};

export type ApplicationFieldInput = {
  question: Scalars['String'];
  required: Scalars['Boolean'];
  type: ApplicationFieldsEnum;
  options?: Maybe<Array<Scalars['String']>>;
};

export enum ApplicationFieldsEnum {
  Text = 'text',
  Textarea = 'textarea',
  Radio = 'radio',
  Checkbox = 'checkbox',
}

export type ApplicationInput = {
  title: Scalars['String'];
  fields: Array<ApplicationFieldInput>;
};

export type CompanyAddressDto = {
  __typename?: 'CompanyAddressDto';
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

export type CompanyImageDto = {
  __typename?: 'CompanyImageDto';
  id: Scalars['ID'];
  filename: Scalars['String'];
  path: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  awsKey: Scalars['String'];
};

export type CompanyMemberDto = {
  __typename?: 'CompanyMemberDto';
  id: Scalars['ID'];
  role: RoleEnum;
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
  phone: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
  address: CompanyAddressDto;
};

export type CreateCompanyInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  phone: Scalars['String'];
  address: CreateCompanyAddressInput;
};

export type CreateCompanyProfileDto = {
  __typename?: 'CreateCompanyProfileDto';
  id: Scalars['ID'];
  business_type: Scalars['String'];
  about: Scalars['String'];
  profile_image: Scalars['String'];
};

export type EmployerCompanyDto = {
  __typename?: 'EmployerCompanyDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
  member: CompanyMemberDto;
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type JobAddressDto = {
  __typename?: 'JobAddressDto';
  id: Scalars['ID'];
  street: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type JobDto = {
  __typename?: 'JobDto';
  id: Scalars['ID'];
  companyName: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  created_at: Scalars['DateTime'];
  type: Scalars['String'];
  tags: Array<Scalars['String']>;
  postings: Array<JobPostingDto>;
};

export type JobInput = {
  name: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
};

export type JobPostingDto = {
  __typename?: 'JobPostingDto';
  id: Scalars['ID'];
  active: Scalars['Boolean'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  pay_rate: Scalars['Int'];
  total_openings: Scalars['Int'];
  remaining_openings: Scalars['Int'];
  apply_deadline: Scalars['DateTime'];
  job: JobDto;
};

export type JobPostingInput = {
  active: Scalars['Boolean'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  pay_rate: Scalars['String'];
  total_openings: Scalars['Int'];
  apply_deadline: Scalars['DateTime'];
};

export type JobPostingResultsDto = {
  __typename?: 'JobPostingResultsDto';
  count: Scalars['Int'];
  postings: Array<JobPostingDto>;
};

export type LocationInput = {
  locality: Scalars['String'];
  coords: CoordsInput;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MemberCompanyDto = {
  __typename?: 'MemberCompanyDto';
  id: Scalars['ID'];
  role: RoleEnum;
  user: UserDto;
  company: CompanyDto;
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
  createPosting: JobPostingDto;
  createApplication: ApplicationDto;
  uploadImage: CompanyImageDto;
  createPostingClient: Scalars['Boolean'];
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
  input: JobInput;
  companySlug: Scalars['String'];
};

export type MutationCreatePostingArgs = {
  input: AddJobPostingInput;
  companySlug: Scalars['String'];
};

export type MutationCreateApplicationArgs = {
  input: ApplicationInput;
  companySlug: Scalars['String'];
};

export type MutationUploadImageArgs = {
  input: UploadImageInput;
  companySlug: Scalars['String'];
};

export type MutationCreatePostingClientArgs = {
  postingId: Scalars['ID'];
  companySlug: Scalars['String'];
};

export type PaginationInput = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
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
  findEmployerCompanies: Array<MemberCompanyDto>;
  findEmployerCompany: EmployerCompanyDto;
  findAllJobs: Array<JobDto>;
  findJob: JobDto;
  findCurrentPostings: JobPostingResultsDto;
  findJobAddresses: Array<JobAddressDto>;
  findPosting: JobPostingDto;
  search: SearchDto;
  findAllApplications: Array<ApplicationDto>;
  findAllCompanyImages: Array<CompanyImageDto>;
  setCompany: Scalars['Boolean'];
  currentCompany: EmployerCompanyDto;
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

export type QueryFindEmployerCompanyArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindAllJobsArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindJobArgs = {
  jobSlug: Scalars['String'];
  companySlug: Scalars['String'];
};

export type QueryFindCurrentPostingsArgs = {
  input: PaginationInput;
  companySlug: Scalars['String'];
};

export type QueryFindJobAddressesArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindPostingArgs = {
  postingId: Scalars['String'];
  companySlug: Scalars['String'];
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QueryFindAllApplicationsArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindAllCompanyImagesArgs = {
  companySlug: Scalars['String'];
};

export type RegisterInput = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum RoleEnum {
  Owner = 'owner',
  Admin = 'admin',
  Manager = 'manager',
  Associate = 'associate',
}

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
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<UpdateCompanyAddressInput>;
};

export type UpdateProfileInput = {
  id: Scalars['ID'];
  profile_image?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
  business_type?: Maybe<Scalars['String']>;
};

export type UploadImageInput = {
  image: Scalars['Upload'];
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
export type CreateApplicationMutationVariables = {
  companySlug: Scalars['String'];
  input: ApplicationInput;
};

export type CreateApplicationMutation = { __typename?: 'Mutation' } & {
  createApplication: { __typename?: 'ApplicationDto' } & Pick<
    ApplicationDto,
    'id'
  >;
};

export type ApplicationPartsFragment = { __typename?: 'ApplicationDto' } & Pick<
  ApplicationDto,
  'id' | 'title'
>;

export type FindAllApplicationsQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllApplicationsQuery = { __typename?: 'Query' } & {
  findAllApplications: Array<
    { __typename?: 'ApplicationDto' } & ApplicationPartsFragment
  >;
};

export type JobPartsFragment = { __typename?: 'JobDto' } & Pick<
  JobDto,
  'id' | 'name' | 'slug' | 'type' | 'created_at'
>;

export type FindAllJobsQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllJobsQuery = { __typename?: 'Query' } & {
  findAllJobs: Array<{ __typename?: 'JobDto' } & JobPartsFragment>;
};

export type FindJobQueryVariables = {
  companySlug: Scalars['String'];
  jobSlug: Scalars['String'];
};

export type FindJobQuery = { __typename?: 'Query' } & {
  findJob: { __typename?: 'JobDto' } & JobPartsFragment;
};

export type CreateJobMutationVariables = {
  companySlug: Scalars['String'];
  input: JobInput;
};

export type CreateJobMutation = { __typename?: 'Mutation' } & {
  createJob: { __typename?: 'JobDto' } & Pick<JobDto, 'id'>;
};

export type PostingPartsFragment = { __typename?: 'JobPostingDto' } & Pick<
  JobPostingDto,
  | 'id'
  | 'start_date'
  | 'end_date'
  | 'pay_rate'
  | 'total_openings'
  | 'remaining_openings'
  | 'apply_deadline'
> & { job: { __typename?: 'JobDto' } & Pick<JobDto, 'name'> };

export type CreatePostingMutationVariables = {
  companySlug: Scalars['String'];
  input: AddJobPostingInput;
};

export type CreatePostingMutation = { __typename?: 'Mutation' } & {
  createPosting: { __typename?: 'JobPostingDto' } & PostingPartsFragment;
};

export type CreatePostingClientMutationVariables = {
  postingId: Scalars['ID'];
  companySlug: Scalars['String'];
};

export type CreatePostingClientMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'createPostingClient'
>;

export type FindJobAddressesQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindJobAddressesQuery = { __typename?: 'Query' } & {
  findJobAddresses: Array<
    { __typename?: 'JobAddressDto' } & Pick<
      JobAddressDto,
      | 'id'
      | 'street'
      | 'street2'
      | 'city'
      | 'state'
      | 'postal_code'
      | 'country'
      | 'coord_lat'
      | 'coord_lng'
    >
  >;
};

export type FindCurrentPostingsQueryVariables = {
  companySlug: Scalars['String'];
  input: PaginationInput;
};

export type FindCurrentPostingsQuery = { __typename?: 'Query' } & {
  findCurrentPostings: { __typename?: 'JobPostingResultsDto' } & Pick<
    JobPostingResultsDto,
    'count'
  > & {
      postings: Array<{ __typename?: 'JobPostingDto' } & PostingPartsFragment>;
    };
};

export type FindPostingQueryVariables = {
  companySlug: Scalars['String'];
  postingId: Scalars['String'];
};

export type FindPostingQuery = { __typename?: 'Query' } & {
  findPosting: { __typename?: 'JobPostingDto' } & PostingPartsFragment;
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
                postings: Array<
                  { __typename?: 'JobPostingDto' } & Pick<
                    JobPostingDto,
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

export type FindEmployerCompaniesQueryVariables = {};

export type FindEmployerCompaniesQuery = { __typename?: 'Query' } & {
  findEmployerCompanies: Array<
    { __typename?: 'MemberCompanyDto' } & Pick<
      MemberCompanyDto,
      'id' | 'role'
    > & {
        company: { __typename?: 'CompanyDto' } & Pick<
          CompanyDto,
          'name' | 'slug' | 'setup_complete'
        >;
      }
  >;
};

export type CompanyPartsFragment = { __typename?: 'EmployerCompanyDto' } & Pick<
  EmployerCompanyDto,
  'id' | 'name' | 'slug' | 'setup_complete'
> & {
    member: { __typename?: 'CompanyMemberDto' } & Pick<
      CompanyMemberDto,
      'role'
    >;
  };

export type FindEmployerCompanyQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindEmployerCompanyQuery = { __typename?: 'Query' } & Pick<
  Query,
  'setCompany'
> & {
    findEmployerCompany: {
      __typename?: 'EmployerCompanyDto';
    } & CompanyPartsFragment;
  };

export type CurrentCompanyQueryVariables = {};

export type CurrentCompanyQuery = { __typename?: 'Query' } & {
  currentCompany: { __typename?: 'EmployerCompanyDto' } & CompanyPartsFragment;
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
    'id' | 'slug' | 'name' | 'phone'
  > & {
      address: { __typename?: 'CompanyAddressDto' } & Pick<
        CompanyAddressDto,
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
    'id' | 'slug' | 'name' | 'phone'
  > & {
      address: { __typename?: 'CompanyAddressDto' } & Pick<
        CompanyAddressDto,
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

export type FindAllCompanyImagesQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllCompanyImagesQuery = { __typename?: 'Query' } & {
  findAllCompanyImages: Array<
    { __typename?: 'CompanyImageDto' } & Pick<CompanyImageDto, 'id' | 'path'>
  >;
};

export type UploadImageMutationVariables = {
  companySlug: Scalars['String'];
  input: UploadImageInput;
};

export type UploadImageMutation = { __typename?: 'Mutation' } & {
  uploadImage: { __typename?: 'CompanyImageDto' } & Pick<
    CompanyImageDto,
    'id' | 'filename' | 'path' | 'thumb' | 'awsKey'
  >;
};
export const ApplicationPartsFragmentDoc = gql`
  fragment ApplicationParts on ApplicationDto {
    id
    title
  }
`;
export const JobPartsFragmentDoc = gql`
  fragment JobParts on JobDto {
    id
    name
    slug
    type
    created_at
  }
`;
export const PostingPartsFragmentDoc = gql`
  fragment PostingParts on JobPostingDto {
    id
    start_date
    end_date
    pay_rate
    total_openings
    remaining_openings
    apply_deadline
    job {
      name
    }
  }
`;
export const CompanyPartsFragmentDoc = gql`
  fragment CompanyParts on EmployerCompanyDto {
    id
    name
    slug
    setup_complete
    member {
      role
    }
  }
`;
export const CreateApplicationDocument = gql`
  mutation CreateApplication($companySlug: String!, $input: ApplicationInput!) {
    createApplication(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
export type CreateApplicationMutationFn = ApolloReactCommon.MutationFunction<
  CreateApplicationMutation,
  CreateApplicationMutationVariables
>;
export type CreateApplicationComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateApplicationMutation,
    CreateApplicationMutationVariables
  >,
  'mutation'
>;

export const CreateApplicationComponent = (
  props: CreateApplicationComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreateApplicationMutation,
    CreateApplicationMutationVariables
  >
    mutation={CreateApplicationDocument}
    {...props}
  />
);

export type CreateApplicationProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateApplicationMutation,
  CreateApplicationMutationVariables
> &
  TChildProps;
export function withCreateApplication<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateApplicationMutation,
    CreateApplicationMutationVariables,
    CreateApplicationProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateApplicationMutation,
    CreateApplicationMutationVariables,
    CreateApplicationProps<TChildProps>
  >(CreateApplicationDocument, {
    alias: 'withCreateApplication',
    ...operationOptions,
  });
}
export type CreateApplicationMutationResult = ApolloReactCommon.MutationResult<
  CreateApplicationMutation
>;
export type CreateApplicationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateApplicationMutation,
  CreateApplicationMutationVariables
>;
export const FindAllApplicationsDocument = gql`
  query FindAllApplications($companySlug: String!) {
    findAllApplications(companySlug: $companySlug) {
      ...ApplicationParts
    }
  }
  ${ApplicationPartsFragmentDoc}
`;
export type FindAllApplicationsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindAllApplicationsQuery,
    FindAllApplicationsQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindAllApplicationsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindAllApplicationsComponent = (
  props: FindAllApplicationsComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindAllApplicationsQuery,
    FindAllApplicationsQueryVariables
  >
    query={FindAllApplicationsDocument}
    {...props}
  />
);

export type FindAllApplicationsProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindAllApplicationsQuery,
  FindAllApplicationsQueryVariables
> &
  TChildProps;
export function withFindAllApplications<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindAllApplicationsQuery,
    FindAllApplicationsQueryVariables,
    FindAllApplicationsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindAllApplicationsQuery,
    FindAllApplicationsQueryVariables,
    FindAllApplicationsProps<TChildProps>
  >(FindAllApplicationsDocument, {
    alias: 'withFindAllApplications',
    ...operationOptions,
  });
}
export type FindAllApplicationsQueryResult = ApolloReactCommon.QueryResult<
  FindAllApplicationsQuery,
  FindAllApplicationsQueryVariables
>;
export const FindAllJobsDocument = gql`
  query FindAllJobs($companySlug: String!) {
    findAllJobs(companySlug: $companySlug) {
      ...JobParts
    }
  }
  ${JobPartsFragmentDoc}
`;
export type FindAllJobsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindAllJobsQuery,
    FindAllJobsQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindAllJobsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindAllJobsComponent = (props: FindAllJobsComponentProps) => (
  <ApolloReactComponents.Query<FindAllJobsQuery, FindAllJobsQueryVariables>
    query={FindAllJobsDocument}
    {...props}
  />
);

export type FindAllJobsProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindAllJobsQuery,
  FindAllJobsQueryVariables
> &
  TChildProps;
export function withFindAllJobs<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindAllJobsQuery,
    FindAllJobsQueryVariables,
    FindAllJobsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindAllJobsQuery,
    FindAllJobsQueryVariables,
    FindAllJobsProps<TChildProps>
  >(FindAllJobsDocument, {
    alias: 'withFindAllJobs',
    ...operationOptions,
  });
}
export type FindAllJobsQueryResult = ApolloReactCommon.QueryResult<
  FindAllJobsQuery,
  FindAllJobsQueryVariables
>;
export const FindJobDocument = gql`
  query FindJob($companySlug: String!, $jobSlug: String!) {
    findJob(companySlug: $companySlug, jobSlug: $jobSlug) {
      ...JobParts
    }
  }
  ${JobPartsFragmentDoc}
`;
export type FindJobComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindJobQuery,
    FindJobQueryVariables
  >,
  'query'
> &
  ({ variables: FindJobQueryVariables; skip?: boolean } | { skip: boolean });

export const FindJobComponent = (props: FindJobComponentProps) => (
  <ApolloReactComponents.Query<FindJobQuery, FindJobQueryVariables>
    query={FindJobDocument}
    {...props}
  />
);

export type FindJobProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindJobQuery,
  FindJobQueryVariables
> &
  TChildProps;
export function withFindJob<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindJobQuery,
    FindJobQueryVariables,
    FindJobProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindJobQuery,
    FindJobQueryVariables,
    FindJobProps<TChildProps>
  >(FindJobDocument, {
    alias: 'withFindJob',
    ...operationOptions,
  });
}
export type FindJobQueryResult = ApolloReactCommon.QueryResult<
  FindJobQuery,
  FindJobQueryVariables
>;
export const CreateJobDocument = gql`
  mutation CreateJob($companySlug: String!, $input: JobInput!) {
    createJob(companySlug: $companySlug, input: $input) {
      id
    }
  }
`;
export type CreateJobMutationFn = ApolloReactCommon.MutationFunction<
  CreateJobMutation,
  CreateJobMutationVariables
>;
export type CreateJobComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateJobMutation,
    CreateJobMutationVariables
  >,
  'mutation'
>;

export const CreateJobComponent = (props: CreateJobComponentProps) => (
  <ApolloReactComponents.Mutation<CreateJobMutation, CreateJobMutationVariables>
    mutation={CreateJobDocument}
    {...props}
  />
);

export type CreateJobProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreateJobMutation,
  CreateJobMutationVariables
> &
  TChildProps;
export function withCreateJob<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateJobMutation,
    CreateJobMutationVariables,
    CreateJobProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateJobMutation,
    CreateJobMutationVariables,
    CreateJobProps<TChildProps>
  >(CreateJobDocument, {
    alias: 'withCreateJob',
    ...operationOptions,
  });
}
export type CreateJobMutationResult = ApolloReactCommon.MutationResult<
  CreateJobMutation
>;
export type CreateJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateJobMutation,
  CreateJobMutationVariables
>;
export const CreatePostingDocument = gql`
  mutation CreatePosting($companySlug: String!, $input: AddJobPostingInput!) {
    createPosting(companySlug: $companySlug, input: $input) {
      ...PostingParts
    }
  }
  ${PostingPartsFragmentDoc}
`;
export type CreatePostingMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostingMutation,
  CreatePostingMutationVariables
>;
export type CreatePostingComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreatePostingMutation,
    CreatePostingMutationVariables
  >,
  'mutation'
>;

export const CreatePostingComponent = (props: CreatePostingComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreatePostingMutation,
    CreatePostingMutationVariables
  >
    mutation={CreatePostingDocument}
    {...props}
  />
);

export type CreatePostingProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  CreatePostingMutation,
  CreatePostingMutationVariables
> &
  TChildProps;
export function withCreatePosting<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreatePostingMutation,
    CreatePostingMutationVariables,
    CreatePostingProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreatePostingMutation,
    CreatePostingMutationVariables,
    CreatePostingProps<TChildProps>
  >(CreatePostingDocument, {
    alias: 'withCreatePosting',
    ...operationOptions,
  });
}
export type CreatePostingMutationResult = ApolloReactCommon.MutationResult<
  CreatePostingMutation
>;
export type CreatePostingMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostingMutation,
  CreatePostingMutationVariables
>;
export const CreatePostingClientDocument = gql`
  mutation CreatePostingClient($postingId: ID!, $companySlug: String!) {
    createPostingClient(postingId: $postingId, companySlug: $companySlug)
      @client
  }
`;
export type CreatePostingClientMutationFn = ApolloReactCommon.MutationFunction<
  CreatePostingClientMutation,
  CreatePostingClientMutationVariables
>;
export type CreatePostingClientComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreatePostingClientMutation,
    CreatePostingClientMutationVariables
  >,
  'mutation'
>;

export const CreatePostingClientComponent = (
  props: CreatePostingClientComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreatePostingClientMutation,
    CreatePostingClientMutationVariables
  >
    mutation={CreatePostingClientDocument}
    {...props}
  />
);

export type CreatePostingClientProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreatePostingClientMutation,
  CreatePostingClientMutationVariables
> &
  TChildProps;
export function withCreatePostingClient<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreatePostingClientMutation,
    CreatePostingClientMutationVariables,
    CreatePostingClientProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreatePostingClientMutation,
    CreatePostingClientMutationVariables,
    CreatePostingClientProps<TChildProps>
  >(CreatePostingClientDocument, {
    alias: 'withCreatePostingClient',
    ...operationOptions,
  });
}
export type CreatePostingClientMutationResult = ApolloReactCommon.MutationResult<
  CreatePostingClientMutation
>;
export type CreatePostingClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostingClientMutation,
  CreatePostingClientMutationVariables
>;
export const FindJobAddressesDocument = gql`
  query FindJobAddresses($companySlug: String!) {
    findJobAddresses(companySlug: $companySlug) {
      id
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
`;
export type FindJobAddressesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindJobAddressesQuery,
    FindJobAddressesQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindJobAddressesQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindJobAddressesComponent = (
  props: FindJobAddressesComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindJobAddressesQuery,
    FindJobAddressesQueryVariables
  >
    query={FindJobAddressesDocument}
    {...props}
  />
);

export type FindJobAddressesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindJobAddressesQuery,
  FindJobAddressesQueryVariables
> &
  TChildProps;
export function withFindJobAddresses<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindJobAddressesQuery,
    FindJobAddressesQueryVariables,
    FindJobAddressesProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindJobAddressesQuery,
    FindJobAddressesQueryVariables,
    FindJobAddressesProps<TChildProps>
  >(FindJobAddressesDocument, {
    alias: 'withFindJobAddresses',
    ...operationOptions,
  });
}
export type FindJobAddressesQueryResult = ApolloReactCommon.QueryResult<
  FindJobAddressesQuery,
  FindJobAddressesQueryVariables
>;
export const FindCurrentPostingsDocument = gql`
  query FindCurrentPostings($companySlug: String!, $input: PaginationInput!) {
    findCurrentPostings(companySlug: $companySlug, input: $input) {
      count
      postings {
        ...PostingParts
      }
    }
  }
  ${PostingPartsFragmentDoc}
`;
export type FindCurrentPostingsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCurrentPostingsQuery,
    FindCurrentPostingsQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCurrentPostingsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCurrentPostingsComponent = (
  props: FindCurrentPostingsComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCurrentPostingsQuery,
    FindCurrentPostingsQueryVariables
  >
    query={FindCurrentPostingsDocument}
    {...props}
  />
);

export type FindCurrentPostingsProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCurrentPostingsQuery,
  FindCurrentPostingsQueryVariables
> &
  TChildProps;
export function withFindCurrentPostings<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCurrentPostingsQuery,
    FindCurrentPostingsQueryVariables,
    FindCurrentPostingsProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCurrentPostingsQuery,
    FindCurrentPostingsQueryVariables,
    FindCurrentPostingsProps<TChildProps>
  >(FindCurrentPostingsDocument, {
    alias: 'withFindCurrentPostings',
    ...operationOptions,
  });
}
export type FindCurrentPostingsQueryResult = ApolloReactCommon.QueryResult<
  FindCurrentPostingsQuery,
  FindCurrentPostingsQueryVariables
>;
export const FindPostingDocument = gql`
  query FindPosting($companySlug: String!, $postingId: String!) {
    findPosting(companySlug: $companySlug, postingId: $postingId) {
      ...PostingParts
    }
  }
  ${PostingPartsFragmentDoc}
`;
export type FindPostingComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindPostingQuery,
    FindPostingQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindPostingQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindPostingComponent = (props: FindPostingComponentProps) => (
  <ApolloReactComponents.Query<FindPostingQuery, FindPostingQueryVariables>
    query={FindPostingDocument}
    {...props}
  />
);

export type FindPostingProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindPostingQuery,
  FindPostingQueryVariables
> &
  TChildProps;
export function withFindPosting<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindPostingQuery,
    FindPostingQueryVariables,
    FindPostingProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindPostingQuery,
    FindPostingQueryVariables,
    FindPostingProps<TChildProps>
  >(FindPostingDocument, {
    alias: 'withFindPosting',
    ...operationOptions,
  });
}
export type FindPostingQueryResult = ApolloReactCommon.QueryResult<
  FindPostingQuery,
  FindPostingQueryVariables
>;
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
          postings {
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
export const FindEmployerCompaniesDocument = gql`
  query FindEmployerCompanies {
    findEmployerCompanies {
      id
      role
      company {
        name
        slug
        setup_complete
      }
    }
  }
`;
export type FindEmployerCompaniesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindEmployerCompaniesQuery,
    FindEmployerCompaniesQueryVariables
  >,
  'query'
>;

export const FindEmployerCompaniesComponent = (
  props: FindEmployerCompaniesComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindEmployerCompaniesQuery,
    FindEmployerCompaniesQueryVariables
  >
    query={FindEmployerCompaniesDocument}
    {...props}
  />
);

export type FindEmployerCompaniesProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindEmployerCompaniesQuery,
  FindEmployerCompaniesQueryVariables
> &
  TChildProps;
export function withFindEmployerCompanies<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindEmployerCompaniesQuery,
    FindEmployerCompaniesQueryVariables,
    FindEmployerCompaniesProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindEmployerCompaniesQuery,
    FindEmployerCompaniesQueryVariables,
    FindEmployerCompaniesProps<TChildProps>
  >(FindEmployerCompaniesDocument, {
    alias: 'withFindEmployerCompanies',
    ...operationOptions,
  });
}
export type FindEmployerCompaniesQueryResult = ApolloReactCommon.QueryResult<
  FindEmployerCompaniesQuery,
  FindEmployerCompaniesQueryVariables
>;
export const FindEmployerCompanyDocument = gql`
  query FindEmployerCompany($companySlug: String!) {
    findEmployerCompany(companySlug: $companySlug) {
      ...CompanyParts
    }
    setCompany @client
  }
  ${CompanyPartsFragmentDoc}
`;
export type FindEmployerCompanyComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindEmployerCompanyQuery,
    FindEmployerCompanyQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindEmployerCompanyQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindEmployerCompanyComponent = (
  props: FindEmployerCompanyComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindEmployerCompanyQuery,
    FindEmployerCompanyQueryVariables
  >
    query={FindEmployerCompanyDocument}
    {...props}
  />
);

export type FindEmployerCompanyProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindEmployerCompanyQuery,
  FindEmployerCompanyQueryVariables
> &
  TChildProps;
export function withFindEmployerCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindEmployerCompanyQuery,
    FindEmployerCompanyQueryVariables,
    FindEmployerCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindEmployerCompanyQuery,
    FindEmployerCompanyQueryVariables,
    FindEmployerCompanyProps<TChildProps>
  >(FindEmployerCompanyDocument, {
    alias: 'withFindEmployerCompany',
    ...operationOptions,
  });
}
export type FindEmployerCompanyQueryResult = ApolloReactCommon.QueryResult<
  FindEmployerCompanyQuery,
  FindEmployerCompanyQueryVariables
>;
export const CurrentCompanyDocument = gql`
  query CurrentCompany {
    currentCompany @client {
      ...CompanyParts
    }
  }
  ${CompanyPartsFragmentDoc}
`;
export type CurrentCompanyComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CurrentCompanyQuery,
    CurrentCompanyQueryVariables
  >,
  'query'
>;

export const CurrentCompanyComponent = (
  props: CurrentCompanyComponentProps,
) => (
  <ApolloReactComponents.Query<
    CurrentCompanyQuery,
    CurrentCompanyQueryVariables
  >
    query={CurrentCompanyDocument}
    {...props}
  />
);

export type CurrentCompanyProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  CurrentCompanyQuery,
  CurrentCompanyQueryVariables
> &
  TChildProps;
export function withCurrentCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CurrentCompanyQuery,
    CurrentCompanyQueryVariables,
    CurrentCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CurrentCompanyQuery,
    CurrentCompanyQueryVariables,
    CurrentCompanyProps<TChildProps>
  >(CurrentCompanyDocument, {
    alias: 'withCurrentCompany',
    ...operationOptions,
  });
}
export type CurrentCompanyQueryResult = ApolloReactCommon.QueryResult<
  CurrentCompanyQuery,
  CurrentCompanyQueryVariables
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
      phone
      address {
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
      phone
      address {
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
export const FindAllCompanyImagesDocument = gql`
  query FindAllCompanyImages($companySlug: String!) {
    findAllCompanyImages(companySlug: $companySlug) {
      id
      path
    }
  }
`;
export type FindAllCompanyImagesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindAllCompanyImagesQuery,
    FindAllCompanyImagesQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindAllCompanyImagesQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindAllCompanyImagesComponent = (
  props: FindAllCompanyImagesComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindAllCompanyImagesQuery,
    FindAllCompanyImagesQueryVariables
  >
    query={FindAllCompanyImagesDocument}
    {...props}
  />
);

export type FindAllCompanyImagesProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindAllCompanyImagesQuery,
  FindAllCompanyImagesQueryVariables
> &
  TChildProps;
export function withFindAllCompanyImages<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindAllCompanyImagesQuery,
    FindAllCompanyImagesQueryVariables,
    FindAllCompanyImagesProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindAllCompanyImagesQuery,
    FindAllCompanyImagesQueryVariables,
    FindAllCompanyImagesProps<TChildProps>
  >(FindAllCompanyImagesDocument, {
    alias: 'withFindAllCompanyImages',
    ...operationOptions,
  });
}
export type FindAllCompanyImagesQueryResult = ApolloReactCommon.QueryResult<
  FindAllCompanyImagesQuery,
  FindAllCompanyImagesQueryVariables
>;
export const UploadImageDocument = gql`
  mutation UploadImage($companySlug: String!, $input: UploadImageInput!) {
    uploadImage(companySlug: $companySlug, input: $input) {
      id
      filename
      path
      thumb
      awsKey
    }
  }
`;
export type UploadImageMutationFn = ApolloReactCommon.MutationFunction<
  UploadImageMutation,
  UploadImageMutationVariables
>;
export type UploadImageComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UploadImageMutation,
    UploadImageMutationVariables
  >,
  'mutation'
>;

export const UploadImageComponent = (props: UploadImageComponentProps) => (
  <ApolloReactComponents.Mutation<
    UploadImageMutation,
    UploadImageMutationVariables
  >
    mutation={UploadImageDocument}
    {...props}
  />
);

export type UploadImageProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UploadImageMutation,
  UploadImageMutationVariables
> &
  TChildProps;
export function withUploadImage<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UploadImageMutation,
    UploadImageMutationVariables,
    UploadImageProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UploadImageMutation,
    UploadImageMutationVariables,
    UploadImageProps<TChildProps>
  >(UploadImageDocument, {
    alias: 'withUploadImage',
    ...operationOptions,
  });
}
export type UploadImageMutationResult = ApolloReactCommon.MutationResult<
  UploadImageMutation
>;
export type UploadImageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UploadImageMutation,
  UploadImageMutationVariables
>;
