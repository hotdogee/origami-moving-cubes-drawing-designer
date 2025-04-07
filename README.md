# Origami Moving Cubes: Interactive Drawing Designer

Inspired by Steve Mould's video: [Self-assembling material pops into 3D (YouTube)](https://www.youtube.com/watch?v=vrOjy-v5JgQ)
![FMRi6pNAoag](https://github.com/user-attachments/assets/bb0196d8-bb63-4004-bbd0-15040c7e4f6a)

As seen on Steve Mould's video: [This new type of illusion is really hard to make (YouTube)](https://youtu.be/FMRi6pNAoag?t=17)
![FMRi6pNAoag](https://github.com/user-attachments/assets/de5855af-e770-4dfd-aeca-51c584f02750)

# Live

Deployed on Vercel: https://cubes.hanl.in/

![Screenshot_20231006-104724_Chrome](https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/c44baed1-ce87-4f69-97b9-f6a50f7f64f0)

# Features

- **Real-time Transformation Preview**
  - Create and design with a live preview, ensuring your creations come to life as you envision them.
- **Synced Brush Cursor**
  - Improve precision and accuracy with a synced brush cursor that's visible in the preview.
- **Persistent Brush Settings**
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

# Screen Recordings

![2023-10-01 12-56-48](https://github.com/user-attachments/assets/8ccea5e5-c659-4073-8333-ce1cbdb58d0b)

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

![locale-switch-android-windows-small](https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/ff07066a-ee94-4e49-9055-cbc26bed0286)

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

# Implementing a Dark Mode Toggle to Next.js 13 App Router and TailwindCSS

![dark-mode-toggle](https://github.com/hotdogee/origami-moving-cubes-drawing-designer/assets/2135411/5bffb96a-2298-4982-b30a-d6f854cc6730)

## Design Goals

- Does not flash the wrong mode on page load. The website should immediately render in the light or dark mode that matches the user's system settings.
- Adds or removes the `dark` class for Tailwind CSS and also sets the CSS `color-scheme` property for scrollbars on the `<html>` element.
- The toggle button allows the user to override the system settings. The toggle button has three states: `Light`, `System`, and `Dark`, with `System` as the default.
- If the toggle is set to `System`, the page should live update if the system settings are changed.
- Theme selection is persisted through page changes and separate sessions using local storage.
- Does not block rendering of the UI until the React app is hydrated and renders. Only a few lines of JavaScript that set the light/dark mode attribute on the `<html>` element should block rendering.
- Does not cause any terminal or browser errors. This includes errors during the server component render and the rendering of any of the React components in the browser.
- The first time the light/dark mode toggle is rendered on the client, it should already be in the correct state. Since this cannot be determined on the server, the toggle component may flash briefly on the client.

## Implementation

### Set up `tailwind.config.ts` to toggle dark mode manually

https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/6c5e44d839396c2439f2b13ca917185ac382b02e/tailwind.config.ts#L9

## Add `suppressHydrationWarning` to the `<html>` element

This property only applies one level deep to just the `<html>` element, so it won't block hydration warnings on other elements.

The `HydrationWarning` is caused by the few lines of JavaScript that add the `dark` class to the `<html>` element according to client settings before first rendering. This is used to prevent the wrong theme from flashing on page load.

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/6c5e44d839396c2439f2b13ca917185ac382b02e/src/app/%5Blang%5D/layout.tsx#L67

## Use the `DarkModeToggle`

Modify the styling to match your site.

This example is styled to match the toggle on the [Official Next.js website](https://nextjs.org/), which is located in the bottom right corner.

All styling is done using Tailwind CSS classes and inline SVG for easy modification.

https://github.com/hotdogee/origami-moving-cubes-drawing-designer/blob/6c5e44d839396c2439f2b13ca917185ac382b02e/src/components/DarkModeToggle.tsx#L1-L200

<a href="https://ko-fi.com/hanlin"><img src="https://github.com/hotdogee/origami-moving-cubes-drawing-designer/raw/main/src/images/kofi.svg" align="left" height="48" ></a>

