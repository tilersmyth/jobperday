import React from 'react';
import Router from 'next/router';
import { Row, Col, Card, Avatar } from 'antd';

import { FindEmployerCompaniesComponent } from '../../../apollo/generated-components';
import { CompanyLayout } from '../shared/layout/company-layout/company-layout';

const { Meta } = Card;

const onCardSelect = (slug: string) => {
  Router.push('/employer/[company-slug]', `/employer/${slug}`);
};

export const EmployerAllCompaniesView: React.FunctionComponent = () => {
  return (
    <CompanyLayout title="Employer Dashboard">
      <FindEmployerCompaniesComponent>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            return <div>Error loading data</div>;
          }

          const { findEmployerCompanies } = data;

          return (
            <Row gutter={16} style={{ marginTop: 20 }}>
              {findEmployerCompanies.map(member => (
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
      </FindEmployerCompaniesComponent>
    </CompanyLayout>
  );
};
