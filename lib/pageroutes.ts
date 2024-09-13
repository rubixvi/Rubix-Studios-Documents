import { Documents } from '@/settings/documents';

export type Paths = 
  | {
      title: string;
      href: string;
      noLink?: true;
      heading?: string;
      items?: Paths[];
    }
  | {
      spacer: true;
    };

export const Routes: Paths[] = [
  ...Documents,
];

type Page = { title: string; href: string };

function isRoute(node: Paths): node is Extract<Paths, { title: string; href: string }> {
  return "title" in node && "href" in node;
}

function getRecurrsiveAllLinks(node: Paths) {
  const ans: Page[] = [];

  if (isRoute(node) && !node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }

  node.items?.forEach((subNode) => {
    if (isRoute(node)) {
      const temp = { ...subNode, href: `${node.href}${subNode.href}` };
      ans.push(...getRecurrsiveAllLinks(temp));
    }
  });

  return ans;
}

export const PageRoutes = Routes.map((it) => getRecurrsiveAllLinks(it)).flat();