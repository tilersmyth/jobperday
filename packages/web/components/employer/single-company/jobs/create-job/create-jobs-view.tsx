import React from 'react';
import { Card } from 'antd';

interface Props {
  companySlug: string;
}

export const CompanyCreateJobsView: React.FunctionComponent<Props> = () => {
  return <Card bordered={false}>create job</Card>;
};
