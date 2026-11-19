# Federal Institutional Atlas

Research-oriented interactive atlas anchored on USACE Huntington District. **Early foundation (v0.1), not a verified or comprehensive federal organization database.**

## Run locally

```bash
npm install
npm run dev
npm test
npm run build
```

## Architecture

- `src/data.ts`: typed institutional entities, typed relationships, authority research leads, integrity checks.
- `src/main.tsx`: accessible searchable explorer, relationship filtering, authority library, decision prompts, local profile and research notes.
- `src/style.css`: responsive light/dark visual system.
- `src/data.test.ts`: dataset integrity smoke tests.
- `.github/workflows/deploy.yml`: test, build and GitHub Pages deployment.

## Source and verification policy

**Source-linked** means a relevant official website is attached; it does **not** mean that the specific relationship has been verified against a dated organizational chart, directive or statutory text. **Research-needed** indicates an illustrative or unresolved relationship. Do not infer command relationships from visual proximity. Program entries are research leads, not final statutory citations. Add publication dates, access dates, legal citation granularity, historical validity and reviewer records before marking a claim verified.

## Planned implementation

1. Foundation: types, app shell, initial dataset, local profile, tests (initial implementation).
2. USACE: source-verified Huntington/LRD/HQ office-level reporting and leadership.
3. Army/DoD: ACOM/ASCC/DRU, JCS and combatant command datasets.
4. Federal: cabinet, EOP and interagency hierarchy.
5. Mission/authority: normalized statute/program/decision records.
6. Graph: pan/zoom network and tree, visual legend, export.
7. Learning: guided paths, knowledge checks, bookmarks.
8. Historical: dated, versioned organization snapshots.
9. Stabilization: accessibility, E2E tests, source audit.
10. Production: verify deployed URL and all workflows.

## GitHub Pages

Set repository **Settings → Pages → Build and deployment → Source: GitHub Actions**. Workflow runs on pushes to `main`. Site base path is `/Political-Bureaucracy-/`.

This independent educational project is not an official USACE publication.
