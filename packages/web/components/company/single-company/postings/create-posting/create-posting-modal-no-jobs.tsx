import React from 'react';
import { Empty, Button } from 'antd';
import Link from 'next/link';

interface Props {
  companySlug: string;
}

export const CreatePostingsModalNoJobs: React.FunctionComponent<Props> = ({
  companySlug,
}) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="Oops, looks like no jobs exist. Create your first job to post!"
  >
    <Link href={`/employer/${companySlug}/jobs/create`}>
      <a>
        <Button size="large" type="primary" style={{ marginTop: 40 }}>
          Create job
        </Button>
      </a>
    </Link>
  </Empty>
);
