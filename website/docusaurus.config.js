// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'J2Commerce Documentation',
  tagline: 'The best up-to-date documentation for J2Commerce',
  favicon: 'img/shortcut.webp',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.j2commerce.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'j2commerce', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // id: 'v4', // omitted => default instance
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/j2commerce/documentation/tree/main/',
        },
        blog: false, // Disable blog
        pages: false, // Disable pages
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

plugins: [
[
'@docusaurus/plugin-content-docs',
{
id: 'v6', // Unique ID for the first instance
path: 'docs-v6', // Source directory for v6 docs
routeBasePath: 'v6', // URL base path for v6
sidebarPath: './sidebars.js',
},
],
],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/j2commerce-social-card.jpg',
      navbar: {
        title: 'J2Commerce',
        logo: {
          alt: 'J2Commerce Logo',
          src: 'img/shortcut.webp',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Documentation v4',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'v6',
            sidebarId: 'docSidebarV6',
            position: 'left',
            label: 'Documentation v6',
          },
        ],
      },
      algolia: {
        appId: 'WDTT4PYPY5',
        apiKey: '19df50541882d5ffa3380ff7eb7227b7',
        indexName: 'j2commerce_documentation_pages',
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} J2Commerce, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
