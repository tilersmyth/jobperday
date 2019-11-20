import React from 'react';
import Router from 'next/router';
import { Row, Col, Card, Avatar } from 'antd';

import { FindCompaniesComponent } from '../../../apollo/generated-components';

const { Meta } = Card;

const onCardSelect = (slug: string) => {
  Router.push('/employer/[company-slug]', `/employer/${slug}`);
};

export const CompanyListView: React.FunctionComponent = () => {
  return (
    <FindCompaniesComponent>
      {({ data, loading, error }) => {
        if (loading) {
          return <div>loading...</div>;
        }

        if (error || !data) {
          return <div>Error loading data</div>;
        }

        const { findCompanies } = data;

        return (
          <Row gutter={16} style={{ marginTop: 20 }}>
            {findCompanies.map(member => (
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 10 }}
                xl={{ span: 8 }}
                key={member.id}
              >
                <Card
                  bordered={false}
                  hoverable={true}
                  onClick={onCardSelect.bind(null, member.company.slug)}
                >
                  <Meta
                    avatar={<Avatar icon="user" shape="square" />}
                    title={member.company.name}
                  />

                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            ))}
          </Row>
        );
      }}
    </FindCompaniesComponent>
  );
};
