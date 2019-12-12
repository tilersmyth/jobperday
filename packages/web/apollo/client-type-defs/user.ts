import gql from 'graphql-tag';

export const userTypeDef = gql`
  enum LocationStorageTypeEnum {
    LOCAL
    GOOGLE
  }

  type LocationStorageDto {
    type: LocationStorageTypeEnum!
    location: SessionLocationDto!
  }

  extend type Query {
    currentUser: UserDto!
    getSearchLocation(locationParam: String!): LocationStorageDto
    getNonSearchLocation: SessionLocationDto
  }

  extend type Mutation {
    setUserLocation(
      searchArgs: SearchInput!
      type: LocationStorageTypeEnum!
    ): Boolean!
  }
`;
