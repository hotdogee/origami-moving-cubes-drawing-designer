# Origami Moving Cubes Drawing Designer

Inspired by Steve Mould's video: [Self-assembling material pops into 3D (YouTube)](https://www.youtube.com/watch?v=vrOjy-v5JgQ)

# Live

Deployed on Vercel: https://cubes.hanl.in/

![Screenshot_20231006-104724_Chrome](https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/c44baed1-ce87-4f69-97b9-f6a50f7f64f0)

# Features

- **Real-time Transformation Preview**
  - Create and design with a live preview, ensuring your creations come to life as you envision them.
- **Synced Brush Cursor**
  - Improve precision and accuracy with a synced brush cursor that's visible in the preview.
- \*_Persistent Brush Settings_
  - Your preferred brush color, size, and opacity settings will remain intact even after reloading the app.
- **Adaptable Dark and Light Themes**
  - Switch between dark and light themes or use your system settings by default.
- **Smooth State Transitions**
  - Switch between different states with smooth animations or manually scrub through transitions for precise control.
- **Optimized Responsive Design**
  - Maximizes screen real estate usage to provide an optimal design experience.
- **Offline support**
  - Able to load and reload without an active network connection.
- **Multilanguage support**
  - Available in English, German, and [Taiwanese Mandarin](https://en.wikipedia.org/wiki/Taiwanese_Mandarin).
  <table>
    <tr>
      <td colspan="2">Responsive Design with CSS <tt>aspect-ratio</tt> @media query </td>
    </tr>
    <tr>
      <td><img src="https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/a99505ef-58cc-49e4-adf5-76449ddb12e0" width="400"></td>
      <td><img src="https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/8a52d28d-722a-43f5-aefb-e50c2a141423" width="400"></td>
    </tr>
  </table>

# Tech Stack

- [Next.js](https://nextjs.org/): React framework with server-side rendering (SSR) and static site generation (SSG).
  - Single component dark mode toggle
  - Simple i18n middleware implementation without using 3rd party libraries.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
- Canvas API: Simple custom drawing implementation.
- CSS animations with custom `@keyframes`
- Progressive Web App (PWA) optimized with offline capability.
- TypeScript

# How to add Internationalization (i18n) to Next.js 13 App Router

## Design Goals

1. Support static site generation (SSG), automatically generated as static HTML + JSON (uses `getStaticProps`).
2. Auto-detect the user's locale by default.
3. Allow users to select their preferred locale and remember their preference.
4. Display the default locale without a URL prefix.
5. Allow users to manually change the locale in the URL and override the detected and saved locales.

## Locale Priority

| Locale Priority      | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| URL locale (/locale) | The locale specified in the URL, e.g. /de or /en/about.       |
| Preferred locale     | The user's preferred locale, saved in a cookie.               |
| Detected locale      | The user's locale, detected using the accept-language header. |
| Default locale       | The website's default locale.                                 |

## Routing Behavior

| Scenario                                                           | Routing Behavior                                                            |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| User visits the website for the first time and their locale is de. | The user is redirected to /de.                                              |
| User visits the website and their preferred locale is fr.          | The user is redirected to /fr, even if their detected locale is de.         |
| User visits /en and their preferred locale is fr.                  | The user's preferred locale is changed to en, and they are redirected to /. |
| User visits /de and their preferred locale is fr.                  | The user's preferred locale is ignored, and /de is displayed.               |

## Example

Suppose a website has the following configuration:

- Default locale: `en`
- Supported locales: `en`, `de`, `fr`

A user visits the website for the first time and their locale is `de`. The user is redirected to `/de` because their detected locale is `de` and there is a supported locale for that language.

The user then selects `fr` as their preferred locale. The next time the user visits the website, they are redirected to `/fr` because their preferred locale is `fr`.

The user then visits `/en`. Their preferred locale is changed to `en` and they are redirected to `/`. This is because the user's preferred locale has precedence over the detected locale.

## Implementation

### Install dependencies

```
npm i @formatjs/intl-localematcher negotiator
npm i -D @types/negotiator
```

### i18n.ts

Configure your default locale (`defaultLocale`) and supported locales (`locales`)

Server Components: Use `getDictionary` to get the translation dictionary `t` for the current locale

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/83eae6cd0ba22b85eedf4dea14b8bf65b5c46291/src/i18n.ts#L1-L19

### middleware.ts

Handles locale detection, redirects, and rewrites, and sets cookies if manually navigated to `/defaultLocale`

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/84f68172608323ae49639e3095a604f38efbb095/src/middleware.ts#L1-L79

### dictionaries

Translations are stored in `/src/dictionaries` as JSON files

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/83eae6cd0ba22b85eedf4dea14b8bf65b5c46291/src/dictionaries/tw.json#L1-L10

### i18n.context.tsx

Client Components: Use `DictionaryContext` to get the translation dictionary `t` for the current locale

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/a3d20ea6b626737100ff42bc8b85cf7b3096ad78/src/context/i18n.context.tsx#L1-L14

### app/[lang]/layout.tsx

Move your `layout.tsx` and `page.tsx` files inside `app/` into `app/[lang]`, icons (`favicon.ico`, `icon.png`, `apple-icon.png`) and `manifest.ts` should stay in `app/`.
In the root layout, use `generateStaticParams` to statically generate all locale routes at build time (SSG) instead of on-demand at request time (SSR).

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/a3d20ea6b626737100ff42bc8b85cf7b3096ad78/src/app/%5Blang%5D/layout.tsx#L1-L10

In the root layout, set up `DictionaryContext` by passing the translation dictionary `t` from `getDictionary` to `DictionaryProvider`.

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/a3d20ea6b626737100ff42bc8b85cf7b3096ad78/src/app/%5Blang%5D/layout.tsx#L58-L74

### LocaleSelect.tsx

You will likely need to implement your own locale selector component so it matches the styling of your site. 

This example uses simple HTML \<select> and \<options> without any external libraries.

Set `LOCALE_COOKIE` when the user chooses a new locale.

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/213423cdacd1a3aa1a569765153458d8cdedb60b/src/components/LocaleSelect.tsx#L1-L55

### Screen Caps

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/a9f6f0ff-b32d-45f2-b30c-5c3f0dfa549f

<a href="https://ko-fi.com/hanlin"><img src="https://github.com/hotdogee/origami-moving-cubes-drawing-designer/raw/main/src/images/kofi.svg" align="left" height="48" ></a>
