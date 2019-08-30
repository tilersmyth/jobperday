import { NextPage } from 'next';
import Router from 'next/router';

import { Layout } from '../components/shared/layout/Layout';
import { NextPageContextApollo } from '../types';
import { checkAuth } from '../utils/checkAuth';
import {
  MeClientComponent,
  LogoutDocument,
} from '../apollo/generated-components';
import { Typography, Button } from 'antd';

const Admin: NextPage = () => (
  <Layout title="Admin Page">
    <MeClientComponent>
      {({ data, client }) => {
        const me = data && data.me;

        if (!me) {
          throw Error('user not in cache');
        }

        const handleLogout = () => {
          client.mutate({ mutation: LogoutDocument });
          Router.push('/login');
        };

        return (
          <div style={{ textAlign: 'center' }}>
            <Typography.Text
              strong={true}
              style={{ display: 'block', marginBottom: 10 }}
            >
              Hi {me.first_name}, welcome to this restricted area
            </Typography.Text>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        );
      }}
    </MeClientComponent>
  </Layout>
);

Admin.getInitialProps = async (ctx: NextPageContextApollo) => {
  await checkAuth(ctx);
  return {};
};

export default Admin;
