# React

- react-canvas-draw
  - https://github.com/embiem/react-canvas-draw
  - https://embiem.github.io/react-canvas-draw/
- react-sketch-canvas
  - https://github.com/vinothpandian/react-sketch-canvas
  - https://vinoth.info/react-sketch-canvas/
- Excalidraw
  - https://github.com/excalidraw/excalidraw
- tldraw
  - https://github.com/tldraw/tldraw

# Old School

- https://code.tutsplus.com/how-to-create-a-web-based-drawing-application-using-canvas--net-14288t/attachment

  - Uses
    canvas.addEventListener("mousedown", ev_canvas, false);
    canvas.addEventListener("mousemove", ev_canvas, false);
    canvas.addEventListener("mouseup", ev_canvas, false);

- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics

  - Uses
    document.addEventListener("mousemove", (e) => {
    curX = e.pageX;
    curY = e.pageY;
    });
    canvas.addEventListener("mousedown", () => (pressed = true));
    canvas.addEventListener("mouseup", () => (pressed = false));
    requestAnimationFrame(draw);

- https://www.programonaut.com/create-a-drawing-app-with-html-and-javascript/

  - context.imageSmoothingEnabled = true;
  - function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;

    return {
    x: (evt.clientX - rect.left) _ scaleX,
    y: (evt.clientY - rect.top) _ scaleY
    }
    }

- Paint App using ReactJS

  - https://www.geeksforgeeks.org/paint-app-using-reactjs/
  - No external libs

- How to implement canvas in React

  - https://www.educative.io/answers/how-to-implement-canvas-in-react
  - npm i react-canvas-paint

- How to Build a Freehand Drawing Using React
  - https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
  - Does not use <canvas>, instead builds SVG

# Use drawImage

https://www.w3schools.com/jsref/canvas_drawimage.asp

- context.drawImage(canvas, sx, sy, swidth, sheight, x, y, width, height)

# Use Canvas API

https://www.w3schools.com/jsref/api_canvas.asp

# Animations

- CSS Animarions with custom @keyframes

# Examples

- https://github.com/tldraw/tldraw

# Responsive Design

- https://www.tldraw.com/s/v2_c_fJvKdeofc9k6eNmDtQHvk?viewport=0%2C0%2C1714%2C1227&page=page%3AnMyM8REMxb8ajBuTqvSsm

# Mobile touch support

- Replace mouse events with pointer events
  ```js
  onMouseDown = { startDrawing }
  onMouseUp = { endDrawing }
  onMouseOut = { endDrawing }
  onMouseMove = { draw }
  ```
  ```js
  onPointerDown = { startDrawing }
  onPointerUp = { endDrawing }
  onPointerOut = { endDrawing }
  onPointerMove = { draw }
  ```
- Added `touch-none` class to UI elements you want to prevent the default dragging behavior:
  - canvas
  - range slider

# Maskable Icons

The idea is to keep the core section of our icon designs within a safe area, which is a central portion of the image with a radius equal to 40% of the minimum icon width and height.
The icon inside the safe area is guaranteed to be displayed independently from the rendered shape, while outside of this portion, it might get cropped, according to which icon shape is used.

- https://maskable.app/editor

# Progressive Web App (PWA)

- https://github.com/shadowwalker/next-pwa/
  - AppDir fork
    https://github.com/DuCanhGH/next-pwa
    https://ducanh-next-pwa.vercel.app/docs

# Research promising tech stacks

- Blitz.js
- https://contentlayer.dev/
  - Contentlayer is a content SDK that validates and transforms your content into type-safe JSON data you can easily import into your application.

# Lighthouse Audit

- Run with incognito mode to avoid extensions slowing down the render

# Color converter

- https://www.w3schools.com/colors/colors_converter.asp

# Next.js

- Intro to Next.js V3
  - https://scottmoss.notion.site/scottmoss/Intro-to-Next-js-V3-6cefbdba58d94e3897dcb8d7e7fc0337

# i18n

- /default-locale
  1. Server sets locale cookies only when navigating to /default-locale
  2. redirects to /
- / rewrites to /default-locale if detected-or-cookie-locale == default-locale
- / redirects to /detected-or-cookie-locale if detected-or-cookie-locale != default-locale
- Client sets locale cookies when user manually chooses a locale from the UI menu
- /locale always renders the page in locale
- What should / render?

  1. / rewrites /default-locale if detected-or-cookie-locale == default-locale
  2. / rewrites /detected-or-cookie-locale -> problems for seo?
  3. / redirects to /detected-or-cookie-locale if detected-or-cookie-locale != default-locale

- Default locale detection, preference persistance
  - Consider SSG, /, /en, /tw
- Routing and Linking
- Localization

- 4.8k Stars: https://github.com/i18next/next-i18next
  Does not work with App Router, only works with Pages Router

- 8.5k Stars: https://github.com/i18next/react-i18next

  - Guide: https://locize.com/blog/next-13-app-dir-i18n/
  - Example: https://github.com/i18next/next-13-app-dir-i18next-example

    - / always redirects to /locale
      Buggy:
      - when changing language by clicking on 'it', the cookie stays at 'de'
        - becuase the cookie is set by the referer page locale

  - app/i18n/locales/en/translation.json
    ```
    {
      "title": "Hi there!",
      "to-second-page": "To second page"
    }
    ```
  - app/[lng]/page.js

    ```
    import Link from 'next/link'
    import { useTranslation } from '../i18n'

    export default async function Page({ params: { lng } }) {
      const { t } = await useTranslation(lng)
      return (
        <>
          <h1>{t('title')}</h1>
          <Link href={`/${lng}/second-page`}>
            {t('to-second-page')}
          </Link>
        </>
      )
    }
    ```

- 1.1k Stars: https://github.com/amannn/next-intl
  - First choice if static rendering was stable
  - Server Components ✅
  - Dynamic rendering ✅
  - Static rendering [Unstable]
  - Sets cookie on first visit, even without manual UI selection
  - https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
  - messages/en.json
    ```
    {
      "Index": {
        "title": "Hello world!"
      }
    }
    ```
  - app/[locale]/page.tsx
    ```
    import {useTranslations} from 'next-intl';
    export default function Index() {
      const t = useTranslations('Index');
      return <h1>{t('title')}</h1>;
    }
    ```
- 814 Stars: https://github.com/QuiiBz/next-international

  - First choice for now
  - Static Site Generation (SSG) / Static Rendering ✅
  - / redirects to /detected-or-cookie-locale
  - Sets cookie on first visit, even without manual UI selection
  - No bugs yet

  - locales/en.ts

  ```
  export default {
    'hello.world': 'Hello {param}!',
    'hello.nested.translations': 'Translations'
  } as const
  ```

  - app/[locale]/page.tsx

  ```
  // Client Component
  'use client'
  import { useI18n, useScopedI18n } from '../../locales/client'

  export default function Page() {
    const t = useI18n()
    const scopedT = useScopedI18n('hello')

    return (
      <div>
        <p>{t('hello')}</p>

        {/* Both are equivalent: */}
        <p>{t('hello.world')}</p>
        <p>{scopedT('world')}</p>

        <p>{t('welcome', { name: 'John' })}</p>
        <p>{t('welcome', { name: <strong>John</strong> })}</p>
      </div>
    )
  }

  // Server Component
  import { getI18n, getScopedI18n } from '../../locales/server'

  export default async function Page() {
    const t = await getI18n()
    const scopedT = await getScopedI18n('hello')

    return (
      <div>
        <p>{t('hello')}</p>

        {/* Both are equivalent: */}
        <p>{t('hello.world')}</p>
        <p>{scopedT('world')}</p>

        <p>{t('welcome', { name: 'John' })}</p>
        <p>{t('welcome', { name: <strong>John</strong> })}</p>
      </div>
    )
  }
  ```

- 55 Stars: https://github.com/i18nexus/next-i18n-router
  - Static Site Generation (SSG) / Static Rendering ✅
  - Set locale cookies only when user manually chooses a locale from the UI menu
  - Does not set cookies by manually changing URL
  - https://i18nexus.com/tutorials/nextjs/react-i18next
  - Buggy
    - If I choose 'de' in the UI, and type '/en' in the URL, I get redirected to '/' than redirected back to '/de'

# UI

👉🏼 Tailwind UI (Paid)
🔗 https://tailwindui.com

👉🏼 Headless UI (Unstyled, from the Tailwind team)
🔗 https://headlessui.com

👉🏼 Heroicons (from the Tailwind team)
🔗 https://heroicons.com

👉🏼 Radix UI (Unstyled, like Headless UI but more complete)
🔗 https://www.radix-ui.com

👉🏼 Shadcn UI (Styled, Built on top of Radix UI)
🔗 https://ui.shadcn.com

👉🏼 Next UI (Styled)
🔗 https://nextui.org

👉🏼 Tremor (charts, page shells)
🔗 https://www.tremor.so/components

👉🏼 Sonner (toast notification, good mobile support)
🔗 https://sonner.emilkowal.ski

👉🏼 Vaul (drawer component for mobile)
🔗 https://vaul.emilkowal.ski

👉🏼 tldraw
🔗 https://www.tldraw.com
