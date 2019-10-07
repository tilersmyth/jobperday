import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, NextRouter } from 'next/router';

import { companyNavTree } from './company-nav-tree';
import Link from 'next/link';
import { navParserUtil } from './route-parser.util';

const { Item, SubMenu } = Menu;

interface Props {
  router: NextRouter;
  companySlug: string;
}

const C: React.FunctionComponent<Props> = ({ router, companySlug }) => {
  const route = navParserUtil(router.pathname);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={route.open}
      selectedKeys={route.select}
    >
      {companyNavTree.map(nav => {
        if (nav.subMenu) {
          return (
            <SubMenu
              key={nav.route}
              title={
                <span>
                  <Icon type={nav.icon} />
                  <span>{nav.title}</span>
                </span>
              }
            >
              {nav.subMenu.map((subNav: any) => {
                const subMenuRoute =
                  nav.route === subNav.route
                    ? nav.route
                    : `${nav.route}${subNav.route}`;

                return (
                  <Item key={subNav.route}>
                    <Link href={`/employer/${companySlug}${subMenuRoute}`}>
                      <a>
                        <Icon type={subNav.icon} />
                        <span>{subNav.title}</span>
                      </a>
                    </Link>
                  </Item>
                );
              })}
            </SubMenu>
          );
        }

        return (
          <Item key={nav.route}>
            <Link href={`/employer/${companySlug}${nav.route}`}>
              <a>
                <Icon type={nav.icon} />
                <span>{nav.title}</span>
              </a>
            </Link>
          </Item>
        );
      })}
    </Menu>
  );
};

export const CompanySingleSidebar = withRouter(C);
