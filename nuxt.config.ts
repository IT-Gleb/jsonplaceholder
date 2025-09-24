import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
    "@vueuse/nuxt",
  ],

  builder: "vite",
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: true,
      chunkSizeWarningLimit: 350,
    },
  },

  app: {
    head: {
      charset: "utf-8",
      title: "Users",
      htmlAttrs: {
        lang: "ru-RU",
      },
      viewport: "width=device-width, initial-scale=1, maximum-scale=5",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["cyrillic-ext", "cyrillic", "latin-ext", "latin"],
      fallbacks: {
        "system-ui": [
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  routeRules: {
    "/": { ssr: true },
    "/users": { swr: 3600 },
  },
});
