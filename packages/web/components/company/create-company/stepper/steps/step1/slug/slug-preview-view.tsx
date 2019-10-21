import React from 'react';
import { Typography } from 'antd';

interface Props {
  value: string;
  editSlug: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const SlugPreviewView: React.FunctionComponent<Props> = ({
  value,
  editSlug,
}) => (
  <Typography.Text>
    {`Handle: ${value} `}
    <a href="#" onClick={editSlug}>
      (Edit)
    </a>
  </Typography.Text>
);
