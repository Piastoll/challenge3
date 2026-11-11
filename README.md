# challenge3 — #4471, what it shows

MEGA.dev S01E03. The support desk merged 412 date reports into #4471 and marked it known. It holds three problems:

| Ticket | Problem | Reports |
|---|---|---|
| [#1](https://github.com/Piastoll/challenge3/issues/1) | Shared parser reads day-first dates month first | 374 |
| [#2](https://github.com/Piastoll/challenge3/issues/2) | booking-v3 form hint says MM/DD/YYYY to day-first tenants | 33 |
| [#3](https://github.com/Piastoll/challenge3/issues/3) | Bookings move by one day across time zones | 5 |

## The kb page
- Source: [`support-kb/src/routes/kb/incidents/4471-split/+page.svx`](support-kb/src/routes/kb/incidents/4471-split/+page.svx)
- Logic: [`support-kb/src/lib/kb/problems.ts`](support-kb/src/lib/kb/problems.ts), [`ProblemTable.svelte`](support-kb/src/lib/kb/ProblemTable.svelte)
- As the desk sees it: [`rendered/kb/incidents/4471-split.html`](rendered/kb/incidents/4471-split.html) (the full static build is in `rendered/`)

## Build
```
cd support-kb
npm install
npm run build
```
