# Soraya Sacaan — portfolio

Bilingual (English / Spanish) portfolio built with React, TypeScript and Vite. It uses the published design system [`@sorayasm/vietri-ds`](https://www.npmjs.com/package/@sorayasm/vietri-ds) with its `editorial` theme (black, white and gold), so it is also a real-world test of the package.

## Getting started

Requires Node.js 20.19 or higher.

```bash
npm install
npm run dev
```

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start the dev server                     |
| `npm run build`      | Type-check and build for production      |
| `npm run preview`    | Preview the production build             |
| `npm run typecheck`  | Run TypeScript checks                    |
| `npm test`           | Run tests (includes axe accessibility)   |

## Where things live

```
src/
├── data/site.ts        # email, social links, where each project can be seen
├── i18n/content.ts     # every text, in English and Spanish
├── i18n/LanguageProvider.tsx
├── sections/           # Work, About, Experience, Skills, Contact
└── App.tsx             # theme, skip link, header, main, footer
```

- **Edit a text:** change it in `src/i18n/content.ts`, in both languages. TypeScript fails if a language is missing a text, and a test checks that both have the same keys.
- **Add a language:** add it to `Language` and `content`, and to the options of the `LanguageSwitch`.
- **Before publishing:** the contact email in `src/data/site.ts` is visible in the page source, so consider a dedicated address to reduce spam. Review the "About" and "Experience" texts (they come from the CV), and add the streaming demo link when it exists. Search the code for `TODO`.

## Changing the photo

The portrait in the "About" section is `public/soraya.webp` (800 × 1000 px). To change it:

1. Replace the file in `public/` (or add a new one).
2. Update it in `src/data/site.ts`:

   ```ts
   photo: { src: "/soraya.webp", width: 800, height: 1000 },
   ```

   `width` and `height` are the real size of the file in pixels. Use `photo: null` to hide it.
3. Edit the alternative text in `src/i18n/content.ts` (`about.photoAlt`) if you want a fuller description.

Recommended: a vertical photo (4:5 ratio, for example 800 × 1000 px) saved as JPEG or WebP under about 150 KB. It appears in the "About" section and is hidden when `photo` is `null`.

## Language and accessibility

- The page language (`<html lang>`) and the tab title follow the selected language, which is saved in the browser and defaults to the browser language.
- One `h1`, a "skip to content" link, header / main / footer landmarks, and a contact form that moves focus to the first field with an error.
- `src/App.test.tsx` runs axe-core on the whole page in both languages.

## Deploying

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`. The workflow runs the type check and the tests first, so a broken version is never published.

**One-time setup**

1. In the repository: *Settings → Pages → Build and deployment → Source: GitHub Actions*.
2. Push to `main` (or run the workflow by hand from the *Actions* tab). The address appears in the workflow run and in *Settings → Pages*; by default it is `https://<user>.github.io/<repository>/`.

**Using the domain `sorayasacaan.com`**

1. In *Settings → Pages → Custom domain*, enter the domain and save. Tick *Enforce HTTPS* when it becomes available.
2. At the domain registrar, point the domain to GitHub Pages (see GitHub's documentation, "Managing a custom domain for your GitHub Pages site"): `A` records for the apex domain and a `CNAME` record for `www`.
3. Create the repository variable `PAGES_BASE` with the value `/` (*Settings → Secrets and variables → Actions → Variables*), and run the workflow again. Without a sub-path, the site is served from the root of the domain.

The files in `public/` must be referenced with `assetUrl("file")` from `src/data/assetUrl.ts`, so they work both at a sub-path and at the root.

Any other static host (Netlify, Vercel, Cloudflare Pages) also works with `npm run build` and the `dist/` folder.
