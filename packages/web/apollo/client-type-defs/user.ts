import gql from 'graphql-tag';

export const userTypeDef = gql`
  enum LocationStorageTypeEnum {
    LOCAL
    GOOGLE
  }

  type LocationStorageDto {
    type: LocationStorageTypeEnum!
    location: UserLocationDto!
  }

  extend type Query {
    currentUser: UserDto!
    getSearchLocation(locationParam: String!): LocationStorageDto
    getNonSearchLocation: UserLocationDto
  }

  extend type Mutation {
    setUserLocation(
      searchArgs: SearchInput!
      type: LocationStorageTypeEnum!
    ): Boolean!
  }
`;
