import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/awa-docs/blog',
    component: ComponentCreator('/awa-docs/blog', 'cea'),
    exact: true
  },
  {
    path: '/awa-docs/blog/archive',
    component: ComponentCreator('/awa-docs/blog/archive', '0dc'),
    exact: true
  },
  {
    path: '/awa-docs/blog/authors',
    component: ComponentCreator('/awa-docs/blog/authors', 'ede'),
    exact: true
  },
  {
    path: '/awa-docs/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/awa-docs/blog/authors/all-sebastien-lorber-articles', '14d'),
    exact: true
  },
  {
    path: '/awa-docs/blog/authors/yangshun',
    component: ComponentCreator('/awa-docs/blog/authors/yangshun', '813'),
    exact: true
  },
  {
    path: '/awa-docs/blog/first-blog-post',
    component: ComponentCreator('/awa-docs/blog/first-blog-post', '00b'),
    exact: true
  },
  {
    path: '/awa-docs/blog/long-blog-post',
    component: ComponentCreator('/awa-docs/blog/long-blog-post', 'ff5'),
    exact: true
  },
  {
    path: '/awa-docs/blog/mdx-blog-post',
    component: ComponentCreator('/awa-docs/blog/mdx-blog-post', '4a9'),
    exact: true
  },
  {
    path: '/awa-docs/blog/tags',
    component: ComponentCreator('/awa-docs/blog/tags', '8be'),
    exact: true
  },
  {
    path: '/awa-docs/blog/tags/docusaurus',
    component: ComponentCreator('/awa-docs/blog/tags/docusaurus', '748'),
    exact: true
  },
  {
    path: '/awa-docs/blog/tags/facebook',
    component: ComponentCreator('/awa-docs/blog/tags/facebook', '2b6'),
    exact: true
  },
  {
    path: '/awa-docs/blog/tags/hello',
    component: ComponentCreator('/awa-docs/blog/tags/hello', '0ca'),
    exact: true
  },
  {
    path: '/awa-docs/blog/tags/hola',
    component: ComponentCreator('/awa-docs/blog/tags/hola', '7cf'),
    exact: true
  },
  {
    path: '/awa-docs/blog/welcome',
    component: ComponentCreator('/awa-docs/blog/welcome', '2ec'),
    exact: true
  },
  {
    path: '/awa-docs/markdown-page',
    component: ComponentCreator('/awa-docs/markdown-page', '57c'),
    exact: true
  },
  {
    path: '/awa-docs/docs',
    component: ComponentCreator('/awa-docs/docs', '158'),
    routes: [
      {
        path: '/awa-docs/docs',
        component: ComponentCreator('/awa-docs/docs', '4f2'),
        routes: [
          {
            path: '/awa-docs/docs',
            component: ComponentCreator('/awa-docs/docs', 'fb6'),
            routes: [
              {
                path: '/awa-docs/docs/category/tutorial---basics',
                component: ComponentCreator('/awa-docs/docs/category/tutorial---basics', '606'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/category/tutorial---extras',
                component: ComponentCreator('/awa-docs/docs/category/tutorial---extras', '597'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/intro',
                component: ComponentCreator('/awa-docs/docs/intro', '9f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/congratulations', '32b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/create-a-blog-post', 'dba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/create-a-document', 'a81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/create-a-page', '92e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/deploy-your-site', '034'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/awa-docs/docs/tutorial-basics/markdown-features', '50d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/awa-docs/docs/tutorial-extras/manage-docs-versions', 'd11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/awa-docs/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/awa-docs/docs/tutorial-extras/translate-your-site', '27a'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/awa-docs/',
    component: ComponentCreator('/awa-docs/', 'c3f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
