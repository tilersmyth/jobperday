import React, { useState, ReactNode } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

export const PostingApplicantsCard: React.FunctionComponent<CardProps> = ({
  ...cardProps
}) => {
  const [tabKey, setTabKey] = useState('outstanding');

  const tabList = [
    {
      key: 'outstanding',
      tab: 'Outstanding',
    },
    {
      key: 'accepted',
      tab: 'Accepted',
    },
    {
      key: 'rejected',
      tab: 'Rejected',
    },
  ];

  const contentList: { [key: string]: ReactNode } = {
    outstanding: <p>Applicants awaiting decision</p>,
    accepted: <p>Accepted applicants</p>,
    rejected: <p>Rejected applicants</p>,
  };

  return (
    <Card
      bordered={false}
      title="Applicants"
      extra={<a href="#">View</a>}
      tabList={tabList}
      activeTabKey={tabKey}
      onTabChange={key => setTabKey(key)}
      {...cardProps}
    >
      {contentList[tabKey]}
    </Card>
  );
};
