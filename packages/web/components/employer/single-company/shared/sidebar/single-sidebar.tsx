import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, NextRouter } from 'next/router';

import { companyNavTree } from './company-nav-tree';
import Link from 'next/link';

const { Item, SubMenu } = Menu;

interface Props {
  router: NextRouter;
  companySlug: string;
}

const parsePath = (path: string) => {
  const routeParts = path.split('/employer/[company-slug]')[1].split('/');

  const count = routeParts.length;

  if (count === 1) {
    return { select: ['/'], open: [''] };
  }

  if (count === 2) {
    return { select: [`/${routeParts[1]}`], open: [''] };
  }

  return { select: [`/${routeParts[2]}`], open: [`/${routeParts[1]}`] };
};

const C: React.FunctionComponent<Props> = ({ router, companySlug }) => {
  const route = parsePath(router.pathname);

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
              {nav.subMenu.map((subNav: any) => (
                <Item key={subNav.route}>
                  <Link
                    href={`/employer/${companySlug}${nav.route}${subNav.route}`}
                  >
                    <a>
                      <Icon type={subNav.icon} />
                      <span>{subNav.title}</span>
                    </a>
                  </Link>
                </Item>
              ))}
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
