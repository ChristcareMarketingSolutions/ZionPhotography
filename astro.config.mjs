import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

import mdx from '@astrojs/mdx';

export default defineConfig({
  // IMPORTANT: before your first deploy, set this to your actual GitHub Pages
  // URL, e.g. 'https://<username>.github.io/zion-photography'
  // (needed for the sitemap and canonical URLs — the site will still build
  // and work without it, but links in the sitemap.xml will be wrong until set)
  site: 'https://example.com',
  // If your repo is NOT named '<username>.github.io' (i.e. it's a normal
  // project repo like 'zion-photography'), GitHub Pages serves it at
  // https://<username>.github.io/zion-photography/ — uncomment the line
  // below and match your repo name, or every internal link will 404:
  // base: '/zion-photography',
  image: {
    domains: ['images.unsplash.com'],
  },
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "fr"],
  //   fallback: {
  //     fr: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en', // All urls that don't contain language prefix will be treated as default locale
        locales: {
          en: 'en', // The `defaultLocale` value must present in `locales` keys
          fr: 'fr',
        },
      },
    }),
    starlight({
      title: 'ScrewFast Docs',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        de: { label: 'Deutsch', lang: 'de' },
        es: { label: 'Español', lang: 'es' },
        fa: { label: 'Persian', lang: 'fa', dir: 'rtl' },
        fr: { label: 'Français', lang: 'fr' },
        ja: { label: '日本語', lang: 'ja' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      sidebar: [
        {
          label: 'Quick Start Guides',
          translations: {
            de: 'Schnellstartanleitungen',
            es: 'Guías de Inicio Rápido',
            fa: 'راهنمای شروع سریع',
            fr: 'Guides de Démarrage Rapide',
            ja: 'クイックスタートガイド',
            'zh-cn': '快速入门指南',
          },
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Tools & Equipment',
          items: [
            { label: 'Tool Guides', link: 'tools/tool-guides/' },
            { label: 'Equipment Care', link: 'tools/equipment-care/' },
          ],
        },
        {
          label: 'Construction Services',
          items: [{ autogenerate: { directory: 'construction' } }],
        },
        {
          label: 'Advanced Topics',
          items: [{ autogenerate: { directory: 'advanced' } }],
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: '#!',
        },
      ],
      disable404Route: true,
      customCss: ['./src/assets/styles/starlight.css'],
      favicon: '/favicon.ico',
      components: {
        SiteTitle: './src/components/ui/starlight/SiteTitle.astro',
        Head: './src/components/ui/starlight/Head.astro',
        MobileMenuFooter:
          './src/components/ui/starlight/MobileMenuFooter.astro',
        ThemeSelect: './src/components/ui/starlight/ThemeSelect.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://screwfast.uk' + '/social.webp',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'twitter:image',
            content: 'https://screwfast.uk' + '/social.webp',
          },
        },
      ],
    }),
    mdx(),
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
