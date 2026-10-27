# Policy Community Website

An independent policy discussion website, built for GitHub Pages with an optional Supabase backend.

This project is not affiliated with any political party. Demo content is illustrative.

## Features
- Search and filter policy cards
- Member sign-up/login and profiles via Supabase Auth
- Comments that require moderation before publication
- Admin tools for policy CRUD and comment moderation
- Responsive design

## Setup
1. Create a Supabase project at https://supabase.com/.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Put the Supabase Project URL and publishable/anon key into `config.js`. Never use a service-role or secret key in browser code.
4. Sign up through the website, then follow the admin promotion SQL comment at the end of `supabase/schema.sql`.
5. In GitHub, open Settings → Pages, select Deploy from a branch, choose `main` and `/(root)`, then save.
6. Add the GitHub Pages URL to Supabase Auth's allowed redirect URLs.

If `config.js` is not configured, the website runs in demo mode; auth, comments, and admin writes are disabled.

## Files
- `index.html`: page structure
- `styles.css`: responsive styling
- `app.js`: search, auth, comments, and admin UI
- `config.js`: public Supabase configuration
- `supabase/schema.sql`: schema and row-level security policies

Before public launch, test RLS thoroughly and consider email verification, CAPTCHA/rate limiting, and a privacy notice.