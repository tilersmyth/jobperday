import { companyNavTree, NavTree } from './company-nav-tree';

interface NavParserUtil {
  open: string[];
  select: string[];
  navTree: NavTree[];
}

export const navParserUtil = (path: string) => {
  const routeParts = path.split('/employer/[company-slug]')[1].split('/');

  if (routeParts.length === 1) {
    return { open: [''], select: ['/'] };
  }

  routeParts.splice(0, 1);

  return routeParts.reduce(
    (acc: NavParserUtil, route: string, index: number) => {
      const currentNav = acc.navTree.find(
        (tree: NavTree) => tree.route === `/${route}`,
      );

      if (!currentNav) {
        return acc;
      }

      if (currentNav.subMenu) {
        const childNav =
          index + 1 === routeParts.length &&
          currentNav.subMenu.find(
            (tree: NavTree) => tree.route === `/${route}`,
          );

        return {
          open: [`/${route}`, ...acc.open],
          navTree: currentNav.subMenu,
          select: childNav ? [`/${route}`, ...acc.select] : acc.select,
        };
      }

      return {
        ...acc,
        select: [`/${route}`, ...acc.select],
      };
    },
    { open: [], select: [], navTree: companyNavTree },
  );
};
