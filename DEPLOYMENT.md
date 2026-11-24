# Deployment Instructions for LLM Agents

This repository deploys to GitHub Pages from `main`. There is no manual upload step and no `dist/` commit. A push to `main` triggers `.github/workflows/deploy.yml`, which builds the Astro site and publishes it with GitHub Pages.

## Non-negotiables

- Never print, log, commit, or paste the contents of `.env`.
- Never put the token in a remote URL, a command argument, or shell history.
- Never force-push `main`.
- Never commit `dist/`; it is gitignored and built in CI.
- The only credential source is the first line of `.env` in the repository root.
- The GitHub username is `maksim-sokal`.

## 1. Preflight

Run from the repository root:

```bash
npm ci
npm run check
npm run build
npm run validate:entities
npm run audit:schema
```

All five must exit `0`. `validate:entities` and `audit:schema` require `dist/`, so they run after the build.

## 2. Commit

```bash
git add -A
git commit -m "<concise description>"
```

Confirm the commit exists:

```bash
git log --oneline -1
git status --short
```

`git status --short` must be empty before pushing.

## 3. Push with the `.env` token

Use a temporary `GIT_ASKPASS` script. The token is read by the script at runtime; it is never placed on the command line.

```bash
ASKPASS="$(mktemp)"
cat > "$ASKPASS" <<'EOF'
#!/bin/sh
case "$1" in
  *Username*) printf '%s\n' "${DEPLOY_USER:-maksim-sokal}" ;;
  *Password*) head -n 1 "${DEPLOY_TOKEN_FILE:?DEPLOY_TOKEN_FILE is not set}" | tr -d '\r\n' ;;
esac
EOF
chmod +x "$ASKPASS"

DEPLOY_USER=maksim-sokal \
DEPLOY_TOKEN_FILE="$PWD/.env" \
GIT_ASKPASS="$ASKPASS" \
GIT_TERMINAL_PROMPT=0 \
git push origin main

rm -f "$ASKPASS"
```

Expected success line:

```text
   <old>..<new>  main -> main
```

A `fatal: User cancelled dialog.` line can appear before the ref update when a credential helper intercepts the prompt. Do not assume failure: check for the `main -> main` line and verify with `git ls-remote`.

```bash
git ls-remote origin main
```

## 4. Verify the deployment

The Pages workflow needs roughly 1–3 minutes. Poll the live page, not the GitHub API (the API can time out from this network):

```bash
for i in $(seq 1 12); do
  code=$(curl -s --max-time 20 -o /tmp/live.html -w "%{http_code}" \
    "https://maksim-sokal.github.io/?v=$(date +%s)")
  if [ "$code" = "200" ]; then
    echo "live: HTTP $code"
    break
  fi
  sleep 15
done
```

For a content-specific check, request the changed page and assert a string that only exists in the new build:

```bash
curl -s "https://maksim-sokal.github.io/aster-dex/api/?v=$(date +%s)" \
  | grep -o '<title>[^<]*'
```

A successful deployment shows the new title, not the previous one.

Optional:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://maksim-sokal.github.io/sitemap-0.xml
```

## 5. Failure handling

| Symptom | Meaning | Action |
|---|---|---|
| `No anonymous write access` | Token missing, empty, or expired | Check that `.env` has one non-empty token line; do not print it |
| `Authentication failed` | Wrong username or token scope | Confirm `maksim-sokal` and a `repo`-scoped token |
| `fatal: User cancelled dialog` but `main -> main` follows | A credential helper cancelled one prompt; push still completed | Verify with `git ls-remote` and the live site |
| `git push` succeeds but site is unchanged | Pages workflow still running or failed | Wait 3 minutes, then inspect the Actions tab for `Deploy to GitHub Pages` |
| `npm run check` fails | Type or template error | Fix before committing; do not bypass with `--no-verify` |
| `audit:schema` fails | JSON-LD claim not visible on the page | Add visible supporting content; do not delete schema to pass |

Never "fix" a failed deploy with `git push --force`. Revert instead.

## 6. Rollback

```bash
git revert <bad-commit-sha>
git push origin main
```

The same askpass procedure applies. Verify the live page after the revert deploy.

## 7. One-paragraph summary for an LLM

> To deploy this repository, run the five preflight commands, commit all changes, and push `main` using a temporary `GIT_ASKPASS` script that reads username `maksim-sokal` and the first line of `.env`. Never expose the token. A push triggers the `Deploy to GitHub Pages` workflow, which builds and publishes the Astro site. Verify by polling the live URL for HTTP 200 and checking that a string from the new build appears in the page title or body. If the GitHub API times out, that is not a deploy failure; verify the site. Never force-push `main`; revert and push again.
