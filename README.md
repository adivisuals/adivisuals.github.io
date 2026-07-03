<<<<<<< HEAD
# Aditya Vishwakarma — Video Editor Portfolio

A cinematic, single-page React portfolio (Vite + Tailwind v4) with:

- **Home / Work / About / Contact** pages
- **Decap CMS** admin panel to manage videos and site text (no coding required)
- **EmailJS** contact form (with a graceful mailto fallback if not configured)
- One-command **GitHub Pages** deployment via GitHub Actions
- Security hardening: CSP, input validation, honeypot, `rel="noopener noreferrer"`

The production build is a **single self-contained `index.html`** (via `vite-plugin-singlefile`), so it works at any GitHub Pages path (`user.github.io` *or* `user.github.io/repo`).

---

## 1. Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

Build a preview:

```bash
npm run build    # outputs dist/index.html (self-contained)
npm run preview
```

---

## 2. Deploy to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. It builds the site and publishes
it to GitHub Pages automatically on every push to `main`.

1. Push the project to a GitHub repository.
2. In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
3. Push to `main`. The workflow runs and your site goes live at
   `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/`
   if the repo is named `<username>.github.io`).

No need to touch `vite.config.ts` — because everything is inlined into one
`index.html`, there are no broken asset paths.

---

## 3. Editing content with the CMS (Decap CMS)

The admin panel lives at **`/admin/`** on your published site (e.g.
`https://<username>.github.io/<repo>/admin/`). You can add/remove videos and edit
the stats line ("N videos · N views · Always giving 100%"), social links, contact
email, etc. — all through a friendly UI. Changes are saved as commits to your repo,
which trigger an automatic rebuild.

### 3a. Open `public/admin/config.yml` and change two values

```yaml
backend:
  repo: your-username/your-repo            # your repository
  base_url: https://your-decap-proxy.example.workers.dev   # from step 3b
```

### 3b. Set up GitHub authentication (OAuth gateway)

GitHub requires a tiny server to handle login. Deploy the free, one-file proxy
**[sterlingwes/decap-proxy](https://github.com/sterlingwes/decap-proxy)** on
Cloudflare Workers (free tier):

1. Create a GitHub OAuth App: **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
   - **Homepage URL:** your site URL (`https://<username>.github.io/<repo>/`)
   - **Authorization callback URL:** your proxy URL (e.g. `https://<proxy>.workers.dev`)
2. Deploy `decap-proxy` to Cloudflare Workers and set its secrets
   `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (from the OAuth app).
3. Put the worker URL into `base_url` in `config.yml`.

Then visit `/admin/`, click **Login with GitHub**, and start editing.

> **Local editing (optional):** uncomment `local_backend: true` in `config.yml`,
> run `npx decap-server` in one terminal and `npm run dev` in another, then open
> `http://localhost:5173/admin/`.

Full Decap docs: <https://decapcms.org/docs/github-backend/>

---

## 4. Contact form with EmailJS

### 4a. Create your EmailJS setup

1. Sign up at <https://www.emailjs.com> and add an **Email Service** (Gmail, Outlook, etc.).
2. Create an **Email Template** that uses these variables (the code sends them):

   | Variable      | Meaning                          |
   |---------------|----------------------------------|
   | `{{from_name}}`   | Full name (First + Last)      |
   | `{{reply_to}}` / `{{email}}` | Sender's email       |
   | `{{subject}}`     | Subject line                 |
   | `{{message}}`     | The message body             |

   Set the template's **To Email** to your inbox and **Reply-To** to `{{reply_to}}`.
3. Copy your **Service ID**, **Template ID**, and **Public Key** from the dashboard.

### 4b. Add the keys

- **Locally:** `cp .env.example .env` and fill in the three `VITE_EMAILJS_*` values.
- **Live site:** add the same three values as **GitHub repository secrets**
  (Settings → Secrets and variables → Actions) named exactly
  `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
  The deploy workflow injects them at build time.

> If the keys are missing, the form still works — it opens the visitor's email app
> with a pre-filled message (`mailto:`) so you never lose a lead.

### 4c. Lock it down (EmailJS dashboard → Account → Security)

- **Allowed Origins:** add your exact site URL(s) so other domains can't abuse your form.
- **Rate limits:** keep the monthly/send caps reasonable.
- **hCaptcha (optional):** enable for stronger bot protection.

---

## 5. Social links & contact details

Already wired to the real handles and fully editable in the CMS (**Site Settings**):

- YouTube: <https://www.youtube.com/@adi.vishwa>
- Instagram: <https://www.instagram.com/adi.visualsss>
- X: <https://x.com/Adi_Visualsss>

Footer copyright: **© 2025 · Video Editor Portfolio · All rights reserved**

---

## 6. Security notes

- **Content Security Policy** is set via a meta tag in `index.html`, restricting
  external connections to Google Fonts and the EmailJS API.
- **No secrets in the repo** — EmailJS config is read from environment variables;
  `.env` is git-ignored and CI uses repository secrets.
- **Form protection** — server-side type/length validation, a hidden honeypot field,
  and EmailJS allowed-origins/rate-limiting.
- **External links** use `target="_blank"` + `rel="noopener noreferrer"`.
- HTTPS is enforced by GitHub Pages.
- CMS content is rendered as text (React escapes it) — no raw HTML injection.

---

## Project structure

```
public/admin/            Decap CMS (index.html + config.yml)
src/content/             site.json + projects.json  ← edited via the CMS
src/data/content.ts      typed loader for the content above
src/pages/               Home, Work, About, Contact
src/components/          Navbar, Footer, SocialIcons
src/utils/               email (EmailJS wrapper), sanitize, cn
src/assets/hero-bg.jpg   inlined into the build as base64
.github/workflows/       GitHub Pages deploy
```
=======
# adivisuals.github.io
>>>>>>> 678c715fc4f61e312ff6c341289425a069d6a063
