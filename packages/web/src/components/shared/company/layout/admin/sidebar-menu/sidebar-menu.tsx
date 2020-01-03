import React from 'react';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { companyNavTree } from './company-nav-tree';
import { navParserUtil } from './route-parser.util';
import { Icon } from '../../../../icon';

const { Item, SubMenu } = Menu;

interface Props {
  companySlug: string;
}

export const CompanySidebarMenu: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const router = useRouter();

  if (!router) {
    return null;
  }

  const route = navParserUtil(router.pathname);

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={route.open}
      selectedKeys={route.select}
      style={{ borderRight: 0 }}
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
                    <Link
                      as={`/employer/${companySlug}${subMenuRoute}`}
                      href={`/employer/[company-slug]${subMenuRoute}`}
                    >
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
          <Item key={nav.route ? nav.route : 'home'}>
            <Link
              as={`/employer/${companySlug}${nav.route}`}
              href={`/employer/[company-slug]${nav.route}`}
            >
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
