import React from 'react';

import { FindPostingQuery } from '../../../../apollo';

interface Props {
  posting: FindPostingQuery['findPosting'];
}

export const PostingSingleClosedView: React.FunctionComponent<Props> = ({
  posting,
}) => {
  console.log(posting);
  return <div>closed posting</div>;
};
