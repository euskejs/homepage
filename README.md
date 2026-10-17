# Kejia Shi — kejiashi.info

Responsive Next.js App Router, TypeScript, and Tailwind CSS website based on `reference-homepage.png`. The original reference is also kept in `public/reference-homepage.png` for comparison only.

## Local development

Use Node.js 24 LTS and npm. The lockfile pins installed versions.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. No environment variables are required for preview mode.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Content and assets

Edit `src/data/site.ts` for biography, career history, focus areas, contact links, and page copy. Styling is in `src/app/globals.css`. The homepage contains the hero, compact career/focus area, and AI Twin chat at the bottom. The header shows the name only; the footer keeps contact icons. The hero CTA scrolls to `#ai-twin`.

- The portrait at `public/kejia-portrait.png` is prepared from the upper portion of the user-supplied `background.png` using AI-assisted checkerboard removal. `site.portrait` selects the asset.
- Email and LinkedIn are configured in the data module and appear on Contact and in the footer. GitHub remains unconfigured and omitted. Approved public contact details are also included in the AI Twin context.
- The homepage career timeline uses locally stored company logos requested by Kejia. Sources and asset details are recorded in `docs/company-logos.md`; the Experience page retains text headings.
- The active skyline comes from the lower portion (rows 585–1023) of the user-supplied `background.png`, preserved as `public/background.png` and cropped in CSS. Its original colors are unchanged. The earlier Wikimedia substitute is no longer displayed. The supplied asset’s source/license was not independently verified.
- The supplied reference is not rendered as the website and is not asserted to be rights-cleared for publication. Remove both reference files from any public release if you do not have permission to redistribute them; keeping the root copy privately is sufficient for future comparisons.

Routes: `/` (including AI Twin), `/about`, `/experience`, `/innovation`, `/contact`, `/credits`; also sitemap, robots, favicon, and a custom 404. Supporting pages remain accessible directly, without header/footer navigation. `/ai-twin` redirects to `/#ai-twin` for existing bookmarks.

## AI Twin configuration

Set `OPENAI_API_KEY` in the local `.env` file or Vercel server environment settings. The key stays in the server-side `POST /api/ai-twin` route and is never sent to the browser. Keep `.env` out of version control. Do not copy `.env.example` over an existing configured file.

The built-in chat takes precedence when a key is present. `OPENAI_MODEL` optionally overrides the default `gpt-4.1-mini`. Without a key, an approved HTTPS `AI_TWIN_URL` remains available as an external-link fallback; without either, the page shows the nonfunctional preview. Restart the dev server after environment changes; redeploy after changing Vercel environment settings.

The twin uses OpenAI's [Responses API](https://developers.openai.com/api/docs/guides/migrate-to-responses) with `store: false`, no tools or web browsing, and a server-supplied profile drawn from the name, role, bio, career and focus fields in `src/data/site.ts`, plus the owner-edited `src/data/ai-twin-knowledge.txt`. Instructions restrict answers to those facts, identify the twin as an AI representation, and decline confidential employer information or unsupported claims. These are model instructions, not a guarantee against all hallucinations; review representative conversations when changing the profile or model.

The page discloses that questions and recent messages are sent to OpenAI. Conversation state exists only in browser component memory and is cleared on refresh or New chat. The app does not log or persist message bodies. `store: false` disables response storage, but does not promise zero provider retention: see [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).

The endpoint validates alternating user/assistant turns, rejects system-role injection, limits request bodies to 24 KB and new questions to 1,000 characters, keeps at most six previous turns, caps output at 600 tokens, and applies a 30-second upstream timeout. Errors preserve the question for resending. Origin checks reject cross-site browser requests. An in-memory per-instance guard allows 60 requests per ten minutes and three concurrent requests; it resets on process restart and is not a distributed quota. Before public deployment, configure shared hosting-edge rate limits and OpenAI project usage controls. This public route is not authenticated.

## GitHub and Vercel deployment

1. Clone `https://github.com/euskejs/homepage.git`, or work in the existing checkout. Keep `.env*` (except `.env.example`) out of Git. Commit changes and push to the repository.
2. Import the repository into Vercel. Select the Next.js framework, repository root directory, Node.js 24, install command `npm ci`, and build command `npm run build`. Leave the output directory at the framework default.
3. Set `OPENAI_API_KEY` and optionally `OPENAI_MODEL` for the built-in chat, or `AI_TWIN_URL` for the external fallback. Redeploy after environment changes. The homepage is rendered dynamically to select the AI Twin connection mode.
4. Review the generated Vercel preview URL: desktop/mobile layout, the hero chat link, every route, image loading, chat send/reply, error recovery, and New chat, and keyboard focus. Review the supplied imagery and missing contact details before public launch.
5. Promote the reviewed deployment and then follow the separate [Route 53 cutover and rollback guide](docs/dns-cutover.md).

The source repository is [euskejs/homepage](https://github.com/euskejs/homepage). Vercel deployment and DNS cutover are separate steps; hosting requires your account and project selection. See [Vercel’s Next.js documentation](https://vercel.com/docs/frameworks/full-stack/nextjs).

## Validation notes

The installed ESLint dependency chain reports a high-severity `braces` advisory affecting glob patterns in development tooling. The registry currently proposes a breaking downgrade of Next's ESLint configuration, not an appropriate runtime fix. Do not run `npm audit fix --force` blindly. Production dependencies are checked separately with `npm audit --omit=dev`. Update the tooling when an upstream compatible fix is available.

Verified locally: lint, TypeScript, production build, content routes (HTTP 200), the legacy AI Twin redirect, unknown route (404), desktop viewport at 1536×1024, mobile layout at 390×844 without horizontal overflow, homepage chat navigation, and disabled AI Twin preview. The browser extension injected an HTML attribute and caused a development-only hydration warning; its attribute was not generated by the site. Production dependency audit: zero reported vulnerabilities at verification time.

AI Twin integration verification: live career summary and confidential-information refusal returned successfully; browser suggestion-to-answer flow and New chat worked; malformed history, system-role injection, oversized questions, and cross-origin calls were rejected. Lint, typecheck, and production build passed. The configured API key was not found in generated client assets. These representative checks do not guarantee every model response is accurate.

## Add information to the AI Twin

Edit [src/data/ai-twin-knowledge.txt](src/data/ai-twin-knowledge.txt) with approved public facts, perspectives, publications, or Q&A. Lines beginning with `#` are ignored, so replace the commented prompts with ordinary text. Empty sections supply no facts. The file supplements the existing profile; update `src/data/site.ts` too when correcting facts shared with the website.

The server reads the file on every chat request. Save and start a New chat to test locally; commit and redeploy for Vercel. The file stays outside `public/`, but its active contents are sent to OpenAI and may appear in chat answers. Keep it under 20,000 characters. Missing, unreadable, or oversized files produce a controlled unavailable response instead of silently ignoring the knowledge source.

The AI Twin interface uses a scrolling conversation with right-aligned question bubbles, full-width assistant answers, and a composer below the message history. Enter sends a message; Shift+Enter inserts a line break (IME composition is respected). The full conversation stays visible until New chat or refresh, while only the last six previous turns are sent to the API. Privacy details remain available beneath the composer.
