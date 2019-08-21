import * as React from 'react';
import Link from 'next/link';
import { Layout } from 'antd';

interface Props {
  title?: string;
}

const MainLayout: React.FunctionComponent<Props> = ({ children }) => (
  <Layout>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/about">
          <a>About</a>
        </Link>{' '}
        |{' '}
        <Link href="/initial-props">
          <a>With Initial Props</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </Layout>
);

export default MainLayout;
