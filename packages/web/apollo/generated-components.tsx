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
  newAddress?: Maybe<AddressInput2>;
};

export type AddJobPostingInput = {
  jobId: Scalars['ID'];
  address: AddJobPostingAddressInput;
  applicationId: Scalars['ID'];
  posting: JobPostingInput;
};

export type AddressDto = {
  __typename?: 'AddressDto';
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

export type AddressInput = {
  street: Scalars['String'];
  street2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  postal_code: Scalars['String'];
  country: Scalars['String'];
  coord_lat: Scalars['Float'];
  coord_lng: Scalars['Float'];
};

export type AddressInput2 = {
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
  created_at: Scalars['DateTime'];
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

export enum BreakpointEnum {
  Xs = 'XS',
  Sm = 'SM',
  Md = 'MD',
  Lg = 'LG',
  Xl = 'XL',
  Xxl = 'XXL',
}

export type CompanyContactDto = {
  __typename?: 'CompanyContactDto';
  id: Scalars['ID'];
  phone: Scalars['String'];
  address: AddressDto;
};

export type CompanyContactInput = {
  phone: Scalars['String'];
  address: AddressInput;
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

export type CompanyInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CompanyMemberDto = {
  __typename?: 'CompanyMemberDto';
  id: Scalars['ID'];
  role: RoleEnum;
  user: UserDto;
};

export type CompanyMemberInput = {
  userId: Scalars['ID'];
  role: MemberRolesEnum;
  confirmed?: Maybe<Scalars['Boolean']>;
};

export type CompanyProfileDto = {
  __typename?: 'CompanyProfileDto';
  id: Scalars['ID'];
  about: Scalars['String'];
  cover_image: Scalars['String'];
  profile_image: Scalars['String'];
};

export type CompanyProfileInput = {
  profile_image?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  about: Scalars['String'];
};

export type CoordsInput = {
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type CreateCompanyDto = {
  __typename?: 'CreateCompanyDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
  contact: CompanyContactDto;
};

export type CurrentCompanyDto = {
  __typename?: 'CurrentCompanyDto';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  setup_complete: Scalars['Boolean'];
  setup_stage: Scalars['Int'];
  members: Array<CompanyMemberDto>;
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
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  created_at: Scalars['DateTime'];
  type: Scalars['String'];
  tags: Array<Scalars['String']>;
  default_image: Scalars['String'];
  defaultApplicationId?: Maybe<Scalars['String']>;
  postings: Array<JobPostingDto>;
};

export type JobInput = {
  title: Scalars['String'];
  summary: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  default_image: Scalars['String'];
  defaultApplicationId?: Maybe<Scalars['String']>;
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

export enum MemberRolesEnum {
  Owner = 'owner',
  Admin = 'admin',
  Manager = 'manager',
  Associate = 'associate',
}

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
  createCompanyContact: CompanyContactDto;
  updateCompanyContact: CompanyContactDto;
  createCompanyProfile: CompanyProfileDto;
  updateCompanyProfile: CompanyProfileDto;
  createCompanyMembers: Array<CompanyMemberDto>;
  createCompany: CreateCompanyDto;
  updateCompany: CreateCompanyDto;
  createJob: JobDto;
  updateJob: JobDto;
  createPosting: JobPostingDto;
  createApplication: ApplicationDto;
  uploadImage: CompanyImageDto;
  updateCompanyContactClient: Scalars['Boolean'];
  updateCompanyProfileClient: Scalars['Boolean'];
  createPostingClient: Scalars['Boolean'];
  viewport: BreakpointEnum;
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

export type MutationCreateCompanyContactArgs = {
  companySlug: Scalars['String'];
  input: CompanyContactInput;
};

export type MutationUpdateCompanyContactArgs = {
  companySlug: Scalars['String'];
  input: UpdateCompanyContactInput;
};

export type MutationCreateCompanyProfileArgs = {
  companySlug: Scalars['String'];
  input: CompanyProfileInput;
};

export type MutationUpdateCompanyProfileArgs = {
  companySlug: Scalars['String'];
  input: UpdateCompanyProfileInput;
};

export type MutationCreateCompanyMembersArgs = {
  companySlug: Scalars['String'];
  input: Array<CompanyMemberInput>;
};

export type MutationCreateCompanyArgs = {
  input: CompanyInput;
};

export type MutationUpdateCompanyArgs = {
  companySlug: Scalars['String'];
  input: UpdateCompanyInput;
};

export type MutationCreateJobArgs = {
  input: JobInput;
  companySlug: Scalars['String'];
};

export type MutationUpdateJobArgs = {
  input: UpdateJobInput;
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

export type MutationUpdateCompanyContactClientArgs = {
  input: UpdateCompanyContactInput;
};

export type MutationUpdateCompanyProfileClientArgs = {
  input: UpdateCompanyProfileInput;
};

export type MutationCreatePostingClientArgs = {
  postingId: Scalars['ID'];
  companySlug: Scalars['String'];
};

export type MutationViewportArgs = {
  breakpoint: BreakpointEnum;
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
  findCompanyContact?: Maybe<CompanyContactDto>;
  findCompanyAddresses: Array<AddressDto>;
  findCompanyProfile?: Maybe<CompanyProfileDto>;
  findCompanies: Array<MemberCompanyDto>;
  findCompanyMembers: Array<CompanyMemberDto>;
  findCompany: CurrentCompanyDto;
  generateCompanySlug: Scalars['String'];
  findCompanySlug?: Maybe<Scalars['String']>;
  findAllJobs: Array<JobDto>;
  findJob: JobDto;
  findCurrentPostings: JobPostingResultsDto;
  findJobAddresses: Array<JobAddressDto>;
  findPosting: JobPostingDto;
  findAllApplications: Array<ApplicationDto>;
  search: SearchDto;
  searchFindJob: SearchJobResultDto;
  findAllCompanyImages: Array<CompanyImageDto>;
  setCompany: Scalars['Boolean'];
  currentCompany: CurrentCompanyDto;
  viewport: BreakpointEnum;
  currentUser: UserDto;
};

export type QueryFindCompanyContactArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCompanyAddressesArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCompanyProfileArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCompanyMembersArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindCompanyArgs = {
  companySlug: Scalars['String'];
};

export type QueryGenerateCompanySlugArgs = {
  name: Scalars['String'];
};

export type QueryFindCompanySlugArgs = {
  name: Scalars['String'];
};

export type QueryFindAllJobsArgs = {
  companySlug: Scalars['String'];
};

export type QueryFindJobArgs = {
  id: Scalars['ID'];
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

export type QueryFindAllApplicationsArgs = {
  companySlug: Scalars['String'];
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QuerySearchFindJobArgs = {
  id: Scalars['ID'];
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

export type SearchCompanyDto = {
  __typename?: 'SearchCompanyDto';
  name: Scalars['String'];
  profile: SearchCompanyProfileDto;
};

export type SearchCompanyProfileDto = {
  __typename?: 'SearchCompanyProfileDto';
  profile_image: Scalars['String'];
};

export type SearchCoordsDto = {
  __typename?: 'SearchCoordsDto';
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type SearchDto = {
  __typename?: 'SearchDto';
  count: Scalars['Int'];
  results: Array<SearchResultListDto>;
};

export type SearchFiltersInput = {
  radius?: Maybe<Scalars['Int']>;
  pay_rate?: Maybe<Scalars['Int']>;
};

export type SearchInput = {
  search: Scalars['String'];
  location: LocationInput;
  filters: SearchFiltersInput;
  pagination: SearchPaginationInput;
};

export type SearchJobDto = {
  __typename?: 'SearchJobDto';
  id: Scalars['ID'];
  title: Scalars['String'];
  postings: Array<SearchJobPostingDto>;
  company: SearchCompanyDto;
};

export type SearchJobPostingDto = {
  __typename?: 'SearchJobPostingDto';
  pay_rate: Scalars['String'];
  end_date: Scalars['DateTime'];
  start_date: Scalars['DateTime'];
  apply_deadline: Scalars['DateTime'];
  remaining_openings: Scalars['Int'];
  address: AddressDto;
};

export type SearchJobResultDto = {
  __typename?: 'SearchJobResultDto';
  id: Scalars['ID'];
  title: Scalars['String'];
  postings: Array<SearchJobPostingDto>;
  company: SearchCompanyDto;
  default_image: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SearchLocationDto = {
  __typename?: 'SearchLocationDto';
  locality: Scalars['String'];
  coords: SearchCoordsDto;
};

export type SearchPaginationInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type SearchResultListDto = {
  __typename?: 'SearchResultListDto';
  job: SearchJobDto;
  rank: Scalars['Float'];
};

export type UpdateAddressInput = {
  id: Scalars['ID'];
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  postal_code?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  coord_lat?: Maybe<Scalars['Float']>;
  coord_lng?: Maybe<Scalars['Float']>;
};

export type UpdateCompanyContactInput = {
  id: Scalars['ID'];
  phone?: Maybe<Scalars['String']>;
  address: UpdateAddressInput;
};

export type UpdateCompanyInput = {
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateCompanyProfileInput = {
  id: Scalars['ID'];
  profile_image?: Maybe<Scalars['String']>;
  cover_image?: Maybe<Scalars['String']>;
  about?: Maybe<Scalars['String']>;
};

export type UpdateJobInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  default_image?: Maybe<Scalars['String']>;
  defaultApplicationId?: Maybe<Scalars['String']>;
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
export type CreateCompanyMutationVariables = {
  input: CompanyInput;
};

export type CreateCompanyMutation = { __typename?: 'Mutation' } & {
  createCompany: { __typename?: 'CreateCompanyDto' } & Pick<
    CreateCompanyDto,
    'id' | 'slug' | 'name'
  >;
};

export type UpdateCompanyMutationVariables = {
  companySlug: Scalars['String'];
  input: UpdateCompanyInput;
};

export type UpdateCompanyMutation = { __typename?: 'Mutation' } & {
  updateCompany: { __typename?: 'CreateCompanyDto' } & Pick<
    CreateCompanyDto,
    'id' | 'slug' | 'name'
  >;
};

export type CompanyPartsFragment = { __typename?: 'CurrentCompanyDto' } & Pick<
  CurrentCompanyDto,
  'id' | 'name' | 'slug' | 'setup_complete' | 'setup_stage'
> & {
    members: Array<
      { __typename?: 'CompanyMemberDto' } & Pick<CompanyMemberDto, 'role'>
    >;
  };

export type FindCompanyQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCompanyQuery = { __typename?: 'Query' } & Pick<
  Query,
  'setCompany'
> & {
    findCompany: { __typename?: 'CurrentCompanyDto' } & CompanyPartsFragment;
  };

export type CurrentCompanyQueryVariables = {};

export type CurrentCompanyQuery = { __typename?: 'Query' } & {
  currentCompany: { __typename?: 'CurrentCompanyDto' } & CompanyPartsFragment;
};

export type GenerateCompanySlugQueryVariables = {
  name: Scalars['String'];
};

export type GenerateCompanySlugQuery = { __typename?: 'Query' } & Pick<
  Query,
  'generateCompanySlug'
>;

export type FindCompanySlugQueryVariables = {
  name: Scalars['String'];
};

export type FindCompanySlugQuery = { __typename?: 'Query' } & Pick<
  Query,
  'findCompanySlug'
>;

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
  'id' | 'title' | 'created_at'
>;

export type FindAllApplicationsQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllApplicationsQuery = { __typename?: 'Query' } & {
  findAllApplications: Array<
    { __typename?: 'ApplicationDto' } & ApplicationPartsFragment
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

export type FindAllCompanyImagesQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllCompanyImagesQuery = { __typename?: 'Query' } & {
  findAllCompanyImages: Array<
    { __typename?: 'CompanyImageDto' } & Pick<CompanyImageDto, 'id' | 'path'>
  >;
};

export type CreateCompanyContactMutationVariables = {
  companySlug: Scalars['String'];
  input: CompanyContactInput;
};

export type CreateCompanyContactMutation = { __typename?: 'Mutation' } & {
  createCompanyContact: {
    __typename?: 'CompanyContactDto';
  } & CompanyContactPartsFragment;
};

export type UpdateCompanyContactMutationVariables = {
  companySlug: Scalars['String'];
  input: UpdateCompanyContactInput;
};

export type UpdateCompanyContactMutation = { __typename?: 'Mutation' } & {
  updateCompanyContact: {
    __typename?: 'CompanyContactDto';
  } & CompanyContactPartsFragment;
};

export type UpdateCompanyContactClientMutationVariables = {
  input: UpdateCompanyContactInput;
};

export type UpdateCompanyContactClientMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'updateCompanyContactClient'>;

export type CompanyContactPartsFragment = {
  __typename?: 'CompanyContactDto';
} & Pick<CompanyContactDto, 'id' | 'phone'> & {
    address: { __typename?: 'AddressDto' } & AddressPartsFragment;
  };

export type FindCompanyContactQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCompanyContactQuery = { __typename?: 'Query' } & {
  findCompanyContact: Maybe<
    { __typename?: 'CompanyContactDto' } & CompanyContactPartsFragment
  >;
};

export type FindCompanyAddressesQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCompanyAddressesQuery = { __typename?: 'Query' } & {
  findCompanyAddresses: Array<
    { __typename?: 'AddressDto' } & AddressPartsFragment
  >;
};

export type CreateCompanyMembersMutationVariables = {
  companySlug: Scalars['String'];
  input: Array<CompanyMemberInput>;
};

export type CreateCompanyMembersMutation = { __typename?: 'Mutation' } & {
  createCompanyMembers: Array<
    { __typename?: 'CompanyMemberDto' } & CompanyMemberPartsFragment
  >;
};

export type FindCompaniesQueryVariables = {};

export type FindCompaniesQuery = { __typename?: 'Query' } & {
  findCompanies: Array<
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

export type CompanyMemberPartsFragment = {
  __typename?: 'CompanyMemberDto';
} & Pick<CompanyMemberDto, 'id' | 'role'> & {
    user: { __typename?: 'UserDto' } & Pick<
      UserDto,
      'email' | 'first_name' | 'last_name'
    >;
  };

export type FindCompanyMembersQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCompanyMembersQuery = { __typename?: 'Query' } & {
  findCompanyMembers: Array<
    { __typename?: 'CompanyMemberDto' } & CompanyMemberPartsFragment
  >;
};

export type CreateCompanyProfileMutationVariables = {
  companySlug: Scalars['String'];
  input: CompanyProfileInput;
};

export type CreateCompanyProfileMutation = { __typename?: 'Mutation' } & {
  createCompanyProfile: {
    __typename?: 'CompanyProfileDto';
  } & CompanyProfilePartsFragment;
};

export type UpdateCompanyProfileMutationVariables = {
  companySlug: Scalars['String'];
  input: UpdateCompanyProfileInput;
};

export type UpdateCompanyProfileMutation = { __typename?: 'Mutation' } & {
  updateCompanyProfile: {
    __typename?: 'CompanyProfileDto';
  } & CompanyProfilePartsFragment;
};

export type UpdateCompanyProfileClientMutationVariables = {
  input: UpdateCompanyProfileInput;
};

export type UpdateCompanyProfileClientMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'updateCompanyProfileClient'>;

export type CompanyProfilePartsFragment = {
  __typename?: 'CompanyProfileDto';
} & Pick<CompanyProfileDto, 'id' | 'about' | 'cover_image' | 'profile_image'>;

export type FindCompanyProfileQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindCompanyProfileQuery = { __typename?: 'Query' } & {
  findCompanyProfile: Maybe<
    { __typename?: 'CompanyProfileDto' } & CompanyProfilePartsFragment
  >;
};

export type CreateJobMutationVariables = {
  companySlug: Scalars['String'];
  input: JobInput;
};

export type CreateJobMutation = { __typename?: 'Mutation' } & {
  createJob: { __typename?: 'JobDto' } & Pick<JobDto, 'id'>;
};

export type UpdateJobMutationVariables = {
  companySlug: Scalars['String'];
  input: UpdateJobInput;
};

export type UpdateJobMutation = { __typename?: 'Mutation' } & {
  updateJob: { __typename?: 'JobDto' } & JobPartsFragment;
};

export type AddressPartsFragment = { __typename?: 'AddressDto' } & Pick<
  AddressDto,
  | 'id'
  | 'street'
  | 'street2'
  | 'city'
  | 'state'
  | 'postal_code'
  | 'country'
  | 'coord_lat'
  | 'coord_lng'
>;

export type SearchQueryVariables = {
  input: SearchInput;
};

export type SearchQuery = { __typename?: 'Query' } & {
  search: { __typename?: 'SearchDto' } & Pick<SearchDto, 'count'> & {
      results: Array<
        { __typename?: 'SearchResultListDto' } & Pick<
          SearchResultListDto,
          'rank'
        > & {
            job: { __typename?: 'SearchJobDto' } & Pick<
              SearchJobDto,
              'id' | 'title'
            > & {
                postings: Array<
                  { __typename?: 'SearchJobPostingDto' } & Pick<
                    SearchJobPostingDto,
                    'pay_rate' | 'start_date' | 'apply_deadline'
                  > & {
                      address: { __typename?: 'AddressDto' } & Pick<
                        AddressDto,
                        'city' | 'state'
                      >;
                    }
                >;
                company: { __typename?: 'SearchCompanyDto' } & Pick<
                  SearchCompanyDto,
                  'name'
                > & {
                    profile: { __typename?: 'SearchCompanyProfileDto' } & Pick<
                      SearchCompanyProfileDto,
                      'profile_image'
                    >;
                  };
              };
          }
      >;
    };
};

export type SearchFindJobQueryVariables = {
  id: Scalars['ID'];
};

export type SearchFindJobQuery = { __typename?: 'Query' } & {
  searchFindJob: { __typename?: 'SearchJobResultDto' } & Pick<
    SearchJobResultDto,
    'id' | 'title' | 'default_image' | 'description' | 'type' | 'tags'
  > & {
      postings: Array<
        { __typename?: 'SearchJobPostingDto' } & Pick<
          SearchJobPostingDto,
          'pay_rate' | 'start_date' | 'apply_deadline' | 'remaining_openings'
        > & {
            address: { __typename?: 'AddressDto' } & Pick<
              AddressDto,
              'street' | 'street2' | 'city' | 'state' | 'postal_code'
            >;
          }
      >;
      company: { __typename?: 'SearchCompanyDto' } & Pick<
        SearchCompanyDto,
        'name'
      > & {
          profile: { __typename?: 'SearchCompanyProfileDto' } & Pick<
            SearchCompanyProfileDto,
            'profile_image'
          >;
        };
    };
};

export type ViewportMutationMutationVariables = {
  breakpoint: BreakpointEnum;
};

export type ViewportMutationMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'viewport'
>;

export type ViewportQueryQueryVariables = {};

export type ViewportQueryQuery = { __typename?: 'Query' } & Pick<
  Query,
  'viewport'
>;

export type UserPartsFragment = { __typename?: 'UserDto' } & Pick<
  UserDto,
  | 'id'
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'realm'
  | 'is_verified'
  | 'setup'
>;

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserDto' } & UserPartsFragment;
};

export type RegisterMutationVariables = {
  input: RegisterInput;
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserDto' } & UserPartsFragment;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type ForgotPasswordMutationVariables = {
  input: ForgotPasswordInput;
};

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'forgotPassword'
>;

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

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'UserDto' } & Pick<
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

export type JobPartsFragment = { __typename?: 'JobDto' } & Pick<
  JobDto,
  | 'id'
  | 'title'
  | 'description'
  | 'summary'
  | 'type'
  | 'tags'
  | 'default_image'
  | 'defaultApplicationId'
  | 'created_at'
>;

export type FindAllJobsQueryVariables = {
  companySlug: Scalars['String'];
};

export type FindAllJobsQuery = { __typename?: 'Query' } & {
  findAllJobs: Array<{ __typename?: 'JobDto' } & JobPartsFragment>;
};

export type FindJobQueryVariables = {
  companySlug: Scalars['String'];
  id: Scalars['ID'];
};

export type FindJobQuery = { __typename?: 'Query' } & {
  findJob: { __typename?: 'JobDto' } & JobPartsFragment;
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
> & { job: { __typename?: 'JobDto' } & Pick<JobDto, 'title'> };

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
export const CompanyPartsFragmentDoc = gql`
  fragment CompanyParts on CurrentCompanyDto {
    id
    name
    slug
    setup_complete
    setup_stage
    members {
      role
    }
  }
`;
export const ApplicationPartsFragmentDoc = gql`
  fragment ApplicationParts on ApplicationDto {
    id
    title
    created_at
  }
`;
export const AddressPartsFragmentDoc = gql`
  fragment AddressParts on AddressDto {
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
`;
export const CompanyContactPartsFragmentDoc = gql`
  fragment CompanyContactParts on CompanyContactDto {
    id
    phone
    address {
      ...AddressParts
    }
  }
  ${AddressPartsFragmentDoc}
`;
export const CompanyMemberPartsFragmentDoc = gql`
  fragment CompanyMemberParts on CompanyMemberDto {
    id
    role
    user {
      email
      first_name
      last_name
    }
  }
`;
export const CompanyProfilePartsFragmentDoc = gql`
  fragment CompanyProfileParts on CompanyProfileDto {
    id
    about
    cover_image
    profile_image
  }
`;
export const UserPartsFragmentDoc = gql`
  fragment UserParts on UserDto {
    id
    first_name
    last_name
    email
    realm
    is_verified
    setup
  }
`;
export const JobPartsFragmentDoc = gql`
  fragment JobParts on JobDto {
    id
    title
    description
    summary
    type
    tags
    default_image
    defaultApplicationId
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
      title
    }
  }
`;
export const CreateCompanyDocument = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
      slug
      name
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
export const UpdateCompanyDocument = gql`
  mutation UpdateCompany($companySlug: String!, $input: UpdateCompanyInput!) {
    updateCompany(companySlug: $companySlug, input: $input) {
      id
      slug
      name
    }
  }
`;
export type UpdateCompanyMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>;
export type UpdateCompanyComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyComponent = (props: UpdateCompanyComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables
  >
    mutation={UpdateCompanyDocument}
    {...props}
  />
);

export type UpdateCompanyProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
> &
  TChildProps;
export function withUpdateCompany<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables,
    UpdateCompanyProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyMutation,
    UpdateCompanyMutationVariables,
    UpdateCompanyProps<TChildProps>
  >(UpdateCompanyDocument, {
    alias: 'withUpdateCompany',
    ...operationOptions,
  });
}
export type UpdateCompanyMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyMutation
>;
export type UpdateCompanyMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables
>;
export const FindCompanyDocument = gql`
  query FindCompany($companySlug: String!) {
    findCompany(companySlug: $companySlug) {
      ...CompanyParts
    }
    setCompany @client
  }
  ${CompanyPartsFragmentDoc}
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
export const FindCompanySlugDocument = gql`
  query FindCompanySlug($name: String!) {
    findCompanySlug(name: $name)
  }
`;
export type FindCompanySlugComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanySlugQuery,
    FindCompanySlugQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanySlugQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanySlugComponent = (
  props: FindCompanySlugComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCompanySlugQuery,
    FindCompanySlugQueryVariables
  >
    query={FindCompanySlugDocument}
    {...props}
  />
);

export type FindCompanySlugProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindCompanySlugQuery,
  FindCompanySlugQueryVariables
> &
  TChildProps;
export function withFindCompanySlug<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanySlugQuery,
    FindCompanySlugQueryVariables,
    FindCompanySlugProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanySlugQuery,
    FindCompanySlugQueryVariables,
    FindCompanySlugProps<TChildProps>
  >(FindCompanySlugDocument, {
    alias: 'withFindCompanySlug',
    ...operationOptions,
  });
}
export type FindCompanySlugQueryResult = ApolloReactCommon.QueryResult<
  FindCompanySlugQuery,
  FindCompanySlugQueryVariables
>;
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
export const CreateCompanyContactDocument = gql`
  mutation CreateCompanyContact(
    $companySlug: String!
    $input: CompanyContactInput!
  ) {
    createCompanyContact(companySlug: $companySlug, input: $input) {
      ...CompanyContactParts
    }
  }
  ${CompanyContactPartsFragmentDoc}
`;
export type CreateCompanyContactMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyContactMutation,
  CreateCompanyContactMutationVariables
>;
export type CreateCompanyContactComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCompanyContactMutation,
    CreateCompanyContactMutationVariables
  >,
  'mutation'
>;

export const CreateCompanyContactComponent = (
  props: CreateCompanyContactComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreateCompanyContactMutation,
    CreateCompanyContactMutationVariables
  >
    mutation={CreateCompanyContactDocument}
    {...props}
  />
);

export type CreateCompanyContactProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateCompanyContactMutation,
  CreateCompanyContactMutationVariables
> &
  TChildProps;
export function withCreateCompanyContact<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCompanyContactMutation,
    CreateCompanyContactMutationVariables,
    CreateCompanyContactProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCompanyContactMutation,
    CreateCompanyContactMutationVariables,
    CreateCompanyContactProps<TChildProps>
  >(CreateCompanyContactDocument, {
    alias: 'withCreateCompanyContact',
    ...operationOptions,
  });
}
export type CreateCompanyContactMutationResult = ApolloReactCommon.MutationResult<
  CreateCompanyContactMutation
>;
export type CreateCompanyContactMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyContactMutation,
  CreateCompanyContactMutationVariables
>;
export const UpdateCompanyContactDocument = gql`
  mutation UpdateCompanyContact(
    $companySlug: String!
    $input: UpdateCompanyContactInput!
  ) {
    updateCompanyContact(companySlug: $companySlug, input: $input) {
      ...CompanyContactParts
    }
  }
  ${CompanyContactPartsFragmentDoc}
`;
export type UpdateCompanyContactMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyContactMutation,
  UpdateCompanyContactMutationVariables
>;
export type UpdateCompanyContactComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyContactMutation,
    UpdateCompanyContactMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyContactComponent = (
  props: UpdateCompanyContactComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyContactMutation,
    UpdateCompanyContactMutationVariables
  >
    mutation={UpdateCompanyContactDocument}
    {...props}
  />
);

export type UpdateCompanyContactProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCompanyContactMutation,
  UpdateCompanyContactMutationVariables
> &
  TChildProps;
export function withUpdateCompanyContact<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyContactMutation,
    UpdateCompanyContactMutationVariables,
    UpdateCompanyContactProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyContactMutation,
    UpdateCompanyContactMutationVariables,
    UpdateCompanyContactProps<TChildProps>
  >(UpdateCompanyContactDocument, {
    alias: 'withUpdateCompanyContact',
    ...operationOptions,
  });
}
export type UpdateCompanyContactMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyContactMutation
>;
export type UpdateCompanyContactMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyContactMutation,
  UpdateCompanyContactMutationVariables
>;
export const UpdateCompanyContactClientDocument = gql`
  mutation UpdateCompanyContactClient($input: UpdateCompanyContactInput!) {
    updateCompanyContactClient(input: $input) @client
  }
`;
export type UpdateCompanyContactClientMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyContactClientMutation,
  UpdateCompanyContactClientMutationVariables
>;
export type UpdateCompanyContactClientComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyContactClientMutation,
    UpdateCompanyContactClientMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyContactClientComponent = (
  props: UpdateCompanyContactClientComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyContactClientMutation,
    UpdateCompanyContactClientMutationVariables
  >
    mutation={UpdateCompanyContactClientDocument}
    {...props}
  />
);

export type UpdateCompanyContactClientProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCompanyContactClientMutation,
  UpdateCompanyContactClientMutationVariables
> &
  TChildProps;
export function withUpdateCompanyContactClient<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyContactClientMutation,
    UpdateCompanyContactClientMutationVariables,
    UpdateCompanyContactClientProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyContactClientMutation,
    UpdateCompanyContactClientMutationVariables,
    UpdateCompanyContactClientProps<TChildProps>
  >(UpdateCompanyContactClientDocument, {
    alias: 'withUpdateCompanyContactClient',
    ...operationOptions,
  });
}
export type UpdateCompanyContactClientMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyContactClientMutation
>;
export type UpdateCompanyContactClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyContactClientMutation,
  UpdateCompanyContactClientMutationVariables
>;
export const FindCompanyContactDocument = gql`
  query FindCompanyContact($companySlug: String!) {
    findCompanyContact(companySlug: $companySlug) {
      ...CompanyContactParts
    }
  }
  ${CompanyContactPartsFragmentDoc}
`;
export type FindCompanyContactComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanyContactQuery,
    FindCompanyContactQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanyContactQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanyContactComponent = (
  props: FindCompanyContactComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCompanyContactQuery,
    FindCompanyContactQueryVariables
  >
    query={FindCompanyContactDocument}
    {...props}
  />
);

export type FindCompanyContactProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCompanyContactQuery,
  FindCompanyContactQueryVariables
> &
  TChildProps;
export function withFindCompanyContact<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanyContactQuery,
    FindCompanyContactQueryVariables,
    FindCompanyContactProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanyContactQuery,
    FindCompanyContactQueryVariables,
    FindCompanyContactProps<TChildProps>
  >(FindCompanyContactDocument, {
    alias: 'withFindCompanyContact',
    ...operationOptions,
  });
}
export type FindCompanyContactQueryResult = ApolloReactCommon.QueryResult<
  FindCompanyContactQuery,
  FindCompanyContactQueryVariables
>;
export const FindCompanyAddressesDocument = gql`
  query FindCompanyAddresses($companySlug: String!) {
    findCompanyAddresses(companySlug: $companySlug) {
      ...AddressParts
    }
  }
  ${AddressPartsFragmentDoc}
`;
export type FindCompanyAddressesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanyAddressesQuery,
    FindCompanyAddressesQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanyAddressesQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanyAddressesComponent = (
  props: FindCompanyAddressesComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCompanyAddressesQuery,
    FindCompanyAddressesQueryVariables
  >
    query={FindCompanyAddressesDocument}
    {...props}
  />
);

export type FindCompanyAddressesProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCompanyAddressesQuery,
  FindCompanyAddressesQueryVariables
> &
  TChildProps;
export function withFindCompanyAddresses<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanyAddressesQuery,
    FindCompanyAddressesQueryVariables,
    FindCompanyAddressesProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanyAddressesQuery,
    FindCompanyAddressesQueryVariables,
    FindCompanyAddressesProps<TChildProps>
  >(FindCompanyAddressesDocument, {
    alias: 'withFindCompanyAddresses',
    ...operationOptions,
  });
}
export type FindCompanyAddressesQueryResult = ApolloReactCommon.QueryResult<
  FindCompanyAddressesQuery,
  FindCompanyAddressesQueryVariables
>;
export const CreateCompanyMembersDocument = gql`
  mutation CreateCompanyMembers(
    $companySlug: String!
    $input: [CompanyMemberInput!]!
  ) {
    createCompanyMembers(companySlug: $companySlug, input: $input) {
      ...CompanyMemberParts
    }
  }
  ${CompanyMemberPartsFragmentDoc}
`;
export type CreateCompanyMembersMutationFn = ApolloReactCommon.MutationFunction<
  CreateCompanyMembersMutation,
  CreateCompanyMembersMutationVariables
>;
export type CreateCompanyMembersComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCompanyMembersMutation,
    CreateCompanyMembersMutationVariables
  >,
  'mutation'
>;

export const CreateCompanyMembersComponent = (
  props: CreateCompanyMembersComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    CreateCompanyMembersMutation,
    CreateCompanyMembersMutationVariables
  >
    mutation={CreateCompanyMembersDocument}
    {...props}
  />
);

export type CreateCompanyMembersProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  CreateCompanyMembersMutation,
  CreateCompanyMembersMutationVariables
> &
  TChildProps;
export function withCreateCompanyMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateCompanyMembersMutation,
    CreateCompanyMembersMutationVariables,
    CreateCompanyMembersProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateCompanyMembersMutation,
    CreateCompanyMembersMutationVariables,
    CreateCompanyMembersProps<TChildProps>
  >(CreateCompanyMembersDocument, {
    alias: 'withCreateCompanyMembers',
    ...operationOptions,
  });
}
export type CreateCompanyMembersMutationResult = ApolloReactCommon.MutationResult<
  CreateCompanyMembersMutation
>;
export type CreateCompanyMembersMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateCompanyMembersMutation,
  CreateCompanyMembersMutationVariables
>;
export const FindCompaniesDocument = gql`
  query FindCompanies {
    findCompanies {
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
export type FindCompaniesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompaniesQuery,
    FindCompaniesQueryVariables
  >,
  'query'
>;

export const FindCompaniesComponent = (props: FindCompaniesComponentProps) => (
  <ApolloReactComponents.Query<FindCompaniesQuery, FindCompaniesQueryVariables>
    query={FindCompaniesDocument}
    {...props}
  />
);

export type FindCompaniesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  FindCompaniesQuery,
  FindCompaniesQueryVariables
> &
  TChildProps;
export function withFindCompanies<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompaniesQuery,
    FindCompaniesQueryVariables,
    FindCompaniesProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompaniesQuery,
    FindCompaniesQueryVariables,
    FindCompaniesProps<TChildProps>
  >(FindCompaniesDocument, {
    alias: 'withFindCompanies',
    ...operationOptions,
  });
}
export type FindCompaniesQueryResult = ApolloReactCommon.QueryResult<
  FindCompaniesQuery,
  FindCompaniesQueryVariables
>;
export const FindCompanyMembersDocument = gql`
  query FindCompanyMembers($companySlug: String!) {
    findCompanyMembers(companySlug: $companySlug) {
      ...CompanyMemberParts
    }
  }
  ${CompanyMemberPartsFragmentDoc}
`;
export type FindCompanyMembersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanyMembersQuery,
    FindCompanyMembersQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanyMembersQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanyMembersComponent = (
  props: FindCompanyMembersComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCompanyMembersQuery,
    FindCompanyMembersQueryVariables
  >
    query={FindCompanyMembersDocument}
    {...props}
  />
);

export type FindCompanyMembersProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCompanyMembersQuery,
  FindCompanyMembersQueryVariables
> &
  TChildProps;
export function withFindCompanyMembers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanyMembersQuery,
    FindCompanyMembersQueryVariables,
    FindCompanyMembersProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanyMembersQuery,
    FindCompanyMembersQueryVariables,
    FindCompanyMembersProps<TChildProps>
  >(FindCompanyMembersDocument, {
    alias: 'withFindCompanyMembers',
    ...operationOptions,
  });
}
export type FindCompanyMembersQueryResult = ApolloReactCommon.QueryResult<
  FindCompanyMembersQuery,
  FindCompanyMembersQueryVariables
>;
export const CreateCompanyProfileDocument = gql`
  mutation CreateCompanyProfile(
    $companySlug: String!
    $input: CompanyProfileInput!
  ) {
    createCompanyProfile(companySlug: $companySlug, input: $input) {
      ...CompanyProfileParts
    }
  }
  ${CompanyProfilePartsFragmentDoc}
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
export const UpdateCompanyProfileDocument = gql`
  mutation UpdateCompanyProfile(
    $companySlug: String!
    $input: UpdateCompanyProfileInput!
  ) {
    updateCompanyProfile(companySlug: $companySlug, input: $input) {
      ...CompanyProfileParts
    }
  }
  ${CompanyProfilePartsFragmentDoc}
`;
export type UpdateCompanyProfileMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyProfileMutation,
  UpdateCompanyProfileMutationVariables
>;
export type UpdateCompanyProfileComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyProfileMutation,
    UpdateCompanyProfileMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyProfileComponent = (
  props: UpdateCompanyProfileComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyProfileMutation,
    UpdateCompanyProfileMutationVariables
  >
    mutation={UpdateCompanyProfileDocument}
    {...props}
  />
);

export type UpdateCompanyProfileProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCompanyProfileMutation,
  UpdateCompanyProfileMutationVariables
> &
  TChildProps;
export function withUpdateCompanyProfile<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyProfileMutation,
    UpdateCompanyProfileMutationVariables,
    UpdateCompanyProfileProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyProfileMutation,
    UpdateCompanyProfileMutationVariables,
    UpdateCompanyProfileProps<TChildProps>
  >(UpdateCompanyProfileDocument, {
    alias: 'withUpdateCompanyProfile',
    ...operationOptions,
  });
}
export type UpdateCompanyProfileMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyProfileMutation
>;
export type UpdateCompanyProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyProfileMutation,
  UpdateCompanyProfileMutationVariables
>;
export const UpdateCompanyProfileClientDocument = gql`
  mutation UpdateCompanyProfileClient($input: UpdateCompanyProfileInput!) {
    updateCompanyProfileClient(input: $input) @client
  }
`;
export type UpdateCompanyProfileClientMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCompanyProfileClientMutation,
  UpdateCompanyProfileClientMutationVariables
>;
export type UpdateCompanyProfileClientComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCompanyProfileClientMutation,
    UpdateCompanyProfileClientMutationVariables
  >,
  'mutation'
>;

export const UpdateCompanyProfileClientComponent = (
  props: UpdateCompanyProfileClientComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    UpdateCompanyProfileClientMutation,
    UpdateCompanyProfileClientMutationVariables
  >
    mutation={UpdateCompanyProfileClientDocument}
    {...props}
  />
);

export type UpdateCompanyProfileClientProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  UpdateCompanyProfileClientMutation,
  UpdateCompanyProfileClientMutationVariables
> &
  TChildProps;
export function withUpdateCompanyProfileClient<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateCompanyProfileClientMutation,
    UpdateCompanyProfileClientMutationVariables,
    UpdateCompanyProfileClientProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateCompanyProfileClientMutation,
    UpdateCompanyProfileClientMutationVariables,
    UpdateCompanyProfileClientProps<TChildProps>
  >(UpdateCompanyProfileClientDocument, {
    alias: 'withUpdateCompanyProfileClient',
    ...operationOptions,
  });
}
export type UpdateCompanyProfileClientMutationResult = ApolloReactCommon.MutationResult<
  UpdateCompanyProfileClientMutation
>;
export type UpdateCompanyProfileClientMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateCompanyProfileClientMutation,
  UpdateCompanyProfileClientMutationVariables
>;
export const FindCompanyProfileDocument = gql`
  query FindCompanyProfile($companySlug: String!) {
    findCompanyProfile(companySlug: $companySlug) {
      ...CompanyProfileParts
    }
  }
  ${CompanyProfilePartsFragmentDoc}
`;
export type FindCompanyProfileComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    FindCompanyProfileQuery,
    FindCompanyProfileQueryVariables
  >,
  'query'
> &
  (
    | { variables: FindCompanyProfileQueryVariables; skip?: boolean }
    | { skip: boolean });

export const FindCompanyProfileComponent = (
  props: FindCompanyProfileComponentProps,
) => (
  <ApolloReactComponents.Query<
    FindCompanyProfileQuery,
    FindCompanyProfileQueryVariables
  >
    query={FindCompanyProfileDocument}
    {...props}
  />
);

export type FindCompanyProfileProps<
  TChildProps = {}
> = ApolloReactHoc.DataProps<
  FindCompanyProfileQuery,
  FindCompanyProfileQueryVariables
> &
  TChildProps;
export function withFindCompanyProfile<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    FindCompanyProfileQuery,
    FindCompanyProfileQueryVariables,
    FindCompanyProfileProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    FindCompanyProfileQuery,
    FindCompanyProfileQueryVariables,
    FindCompanyProfileProps<TChildProps>
  >(FindCompanyProfileDocument, {
    alias: 'withFindCompanyProfile',
    ...operationOptions,
  });
}
export type FindCompanyProfileQueryResult = ApolloReactCommon.QueryResult<
  FindCompanyProfileQuery,
  FindCompanyProfileQueryVariables
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
export const UpdateJobDocument = gql`
  mutation UpdateJob($companySlug: String!, $input: UpdateJobInput!) {
    updateJob(companySlug: $companySlug, input: $input) {
      ...JobParts
    }
  }
  ${JobPartsFragmentDoc}
`;
export type UpdateJobMutationFn = ApolloReactCommon.MutationFunction<
  UpdateJobMutation,
  UpdateJobMutationVariables
>;
export type UpdateJobComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateJobMutation,
    UpdateJobMutationVariables
  >,
  'mutation'
>;

export const UpdateJobComponent = (props: UpdateJobComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateJobMutation, UpdateJobMutationVariables>
    mutation={UpdateJobDocument}
    {...props}
  />
);

export type UpdateJobProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  UpdateJobMutation,
  UpdateJobMutationVariables
> &
  TChildProps;
export function withUpdateJob<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateJobMutation,
    UpdateJobMutationVariables,
    UpdateJobProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateJobMutation,
    UpdateJobMutationVariables,
    UpdateJobProps<TChildProps>
  >(UpdateJobDocument, {
    alias: 'withUpdateJob',
    ...operationOptions,
  });
}
export type UpdateJobMutationResult = ApolloReactCommon.MutationResult<
  UpdateJobMutation
>;
export type UpdateJobMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateJobMutation,
  UpdateJobMutationVariables
>;
export const SearchDocument = gql`
  query Search($input: SearchInput!) {
    search(input: $input) {
      count
      results {
        rank
        job {
          id
          title
          postings {
            pay_rate
            start_date
            apply_deadline
            address {
              city
              state
            }
          }
          company {
            name
            profile {
              profile_image
            }
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
export const SearchFindJobDocument = gql`
  query SearchFindJob($id: ID!) {
    searchFindJob(id: $id) {
      id
      title
      default_image
      description
      type
      tags
      postings {
        pay_rate
        start_date
        apply_deadline
        remaining_openings
        address {
          street
          street2
          city
          state
          postal_code
        }
      }
      company {
        name
        profile {
          profile_image
        }
      }
    }
  }
`;
export type SearchFindJobComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    SearchFindJobQuery,
    SearchFindJobQueryVariables
  >,
  'query'
> &
  (
    | { variables: SearchFindJobQueryVariables; skip?: boolean }
    | { skip: boolean });

export const SearchFindJobComponent = (props: SearchFindJobComponentProps) => (
  <ApolloReactComponents.Query<SearchFindJobQuery, SearchFindJobQueryVariables>
    query={SearchFindJobDocument}
    {...props}
  />
);

export type SearchFindJobProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  SearchFindJobQuery,
  SearchFindJobQueryVariables
> &
  TChildProps;
export function withSearchFindJob<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SearchFindJobQuery,
    SearchFindJobQueryVariables,
    SearchFindJobProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    SearchFindJobQuery,
    SearchFindJobQueryVariables,
    SearchFindJobProps<TChildProps>
  >(SearchFindJobDocument, {
    alias: 'withSearchFindJob',
    ...operationOptions,
  });
}
export type SearchFindJobQueryResult = ApolloReactCommon.QueryResult<
  SearchFindJobQuery,
  SearchFindJobQueryVariables
>;
export const ViewportMutationDocument = gql`
  mutation ViewportMutation($breakpoint: BreakpointEnum!) {
    viewport(breakpoint: $breakpoint) @client
  }
`;
export type ViewportMutationMutationFn = ApolloReactCommon.MutationFunction<
  ViewportMutationMutation,
  ViewportMutationMutationVariables
>;
export type ViewportMutationComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ViewportMutationMutation,
    ViewportMutationMutationVariables
  >,
  'mutation'
>;

export const ViewportMutationComponent = (
  props: ViewportMutationComponentProps,
) => (
  <ApolloReactComponents.Mutation<
    ViewportMutationMutation,
    ViewportMutationMutationVariables
  >
    mutation={ViewportMutationDocument}
    {...props}
  />
);

export type ViewportMutationProps<
  TChildProps = {}
> = ApolloReactHoc.MutateProps<
  ViewportMutationMutation,
  ViewportMutationMutationVariables
> &
  TChildProps;
export function withViewportMutation<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ViewportMutationMutation,
    ViewportMutationMutationVariables,
    ViewportMutationProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ViewportMutationMutation,
    ViewportMutationMutationVariables,
    ViewportMutationProps<TChildProps>
  >(ViewportMutationDocument, {
    alias: 'withViewportMutation',
    ...operationOptions,
  });
}
export type ViewportMutationMutationResult = ApolloReactCommon.MutationResult<
  ViewportMutationMutation
>;
export type ViewportMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ViewportMutationMutation,
  ViewportMutationMutationVariables
>;
export const ViewportQueryDocument = gql`
  query ViewportQuery {
    viewport @client
  }
`;
export type ViewportQueryComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ViewportQueryQuery,
    ViewportQueryQueryVariables
  >,
  'query'
>;

export const ViewportQueryComponent = (props: ViewportQueryComponentProps) => (
  <ApolloReactComponents.Query<ViewportQueryQuery, ViewportQueryQueryVariables>
    query={ViewportQueryDocument}
    {...props}
  />
);

export type ViewportQueryProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  ViewportQueryQuery,
  ViewportQueryQueryVariables
> &
  TChildProps;
export function withViewportQuery<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ViewportQueryQuery,
    ViewportQueryQueryVariables,
    ViewportQueryProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    ViewportQueryQuery,
    ViewportQueryQueryVariables,
    ViewportQueryProps<TChildProps>
  >(ViewportQueryDocument, {
    alias: 'withViewportQuery',
    ...operationOptions,
  });
}
export type ViewportQueryQueryResult = ApolloReactCommon.QueryResult<
  ViewportQueryQuery,
  ViewportQueryQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
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
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...UserParts
    }
  }
  ${UserPartsFragmentDoc}
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
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
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
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser @client {
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
export type CurrentUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >,
  'query'
>;

export const CurrentUserComponent = (props: CurrentUserComponentProps) => (
  <ApolloReactComponents.Query<CurrentUserQuery, CurrentUserQueryVariables>
    query={CurrentUserDocument}
    {...props}
  />
);

export type CurrentUserProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  CurrentUserQuery,
  CurrentUserQueryVariables
> &
  TChildProps;
export function withCurrentUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CurrentUserQuery,
    CurrentUserQueryVariables,
    CurrentUserProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CurrentUserQuery,
    CurrentUserQueryVariables,
    CurrentUserProps<TChildProps>
  >(CurrentUserDocument, {
    alias: 'withCurrentUser',
    ...operationOptions,
  });
}
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
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
  query FindJob($companySlug: String!, $id: ID!) {
    findJob(companySlug: $companySlug, id: $id) {
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
