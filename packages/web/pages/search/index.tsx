import { NextPage } from 'next';
import ApolloClient from 'apollo-client';

import { NextPageContextApollo } from '../../types';
import {
  SearchInput,
  GetSearchLocationDocument,
  GetSearchLocationQuery,
  LocationStorageTypeEnum,
  SetUserLocationDocument,
} from '../../apollo';
import { queryToSearch, searchArgsSchema } from '../../utils/search';
import {
  SearchView,
  SearchErrorView,
  SearchErrorEnum,
} from '../../components/search';
import { fetchMe } from '../../utils';

interface Props {
  searchArgs: SearchInput;
  error?: SearchErrorEnum;
  locType?: LocationStorageTypeEnum;
}

const Search: NextPage<Props> = ({ searchArgs, locType, error }) => {
  if (error) {
    return <SearchErrorView searchArgs={searchArgs} error={error} />;
  }

  const onCompleted = (client: ApolloClient<object>) => {
    // This updates local location storage and url params if necessary
    client.mutate({
      mutation: SetUserLocationDocument,
      variables: { searchArgs, type: locType },
    });
  };

  return <SearchView searchArgs={searchArgs} onCompleted={onCompleted} />;
};

Search.getInitialProps = async (ctx: NextPageContextApollo) => {
  // Keep fetchMe to load user into cache
  await fetchMe(ctx);

  const query = ctx.query as { [key: string]: string };

  const searchArgs = queryToSearch(query);

  if (!query.location) {
    return { searchArgs, error: SearchErrorEnum.NO_LOCATION };
  }

  const {
    data: { getSearchLocation },
  } = await ctx.apolloClient.query<GetSearchLocationQuery>({
    query: GetSearchLocationDocument,
    variables: { locationParam: query.location },
    context: { nextCtx: ctx },
  });

  if (!getSearchLocation) {
    return { searchArgs, error: SearchErrorEnum.INVALID_LOCATION };
  }

  // Manual parse to remove __typename
  searchArgs.location = {
    locality: getSearchLocation.location.locality,
    coords: {
      lat: getSearchLocation.location.coords.lat,
      lng: getSearchLocation.location.coords.lng,
    },
  };

  try {
    await searchArgsSchema.validate(searchArgs);
  } catch (err) {
    return { searchArgs, error: SearchErrorEnum.INVALID_FILTER };
  }

  return { searchArgs, locType: getSearchLocation.type };
};

export default Search;
