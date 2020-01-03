import React from 'react';
import { Empty, Button } from 'antd';
import Link from 'next/link';

interface Props {
  companySlug: string;
}

export const CreatePostingNoJobsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="Oops, no jobs ready to post at this time!"
  >
    <Link
      href={`/employer/[company-slug]/jobs/create`}
      as={`/employer/${companySlug}/jobs/create`}
    >
      <a>
        <Button size="large" type="primary" style={{ marginTop: 40 }}>
          Create job
        </Button>
      </a>
    </Link>
  </Empty>
);
