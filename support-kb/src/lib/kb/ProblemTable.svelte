<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { PROBLEMS, splitTicket, type Problem } from '#lib/kb/problems';

  // tickets: problem → link to the ticket filed for it.
  let { ticket, tickets = {} }: { ticket: number; tickets?: Partial<Record<Problem, string>> } = $props();

  const split = $derived(splitTicket(reports as Report[], ticket, tenantOf, notes.oneDayMove));
  const channels = (c: Record<string, number>) =>
    Object.entries(c)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `${k} ×${n}`)
      .join(' · ');
  const label = (href: string) => '#' + href.split('/').pop();
</script>

<p class="sum">
  <strong>{split.total}</strong> reports in #{ticket} ·
  <strong>{split.groups.length}</strong>
  {split.groups.length === 1 ? 'problem' : 'problems'} · counted as the desk files them
</p>

<table>
  <thead>
    <tr><th>problem</th><th>reports</th><th>tenants</th><th>channels</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each split.groups as g (g.problem)}
      <tr>
        <td><code>{g.problem}</code> {PROBLEMS[g.problem].name}<br /><small>{PROBLEMS[g.problem].shows}</small></td>
        <td><strong>{g.reports.length}</strong>{#if g.filedUnder}<br /><small>also in <code>{g.filedUnder}</code></small>{/if}</td>
        <td>{g.tenants}</td>
        <td class="muted">{channels(g.channels)}</td>
        <td class="muted">{g.firstSeen} → {g.lastSeen}</td>
        <td>
          {#if tickets[g.problem]}<a href={tickets[g.problem]}>{label(tickets[g.problem] ?? '')}</a>{:else}—{/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#each split.groups.filter((g) => g.filedUnder) as g (g.problem)}
  <p class="muted">{g.reports.length} <code>{g.problem}</code> reports are filed under <code>{g.filedUnder}</code> by tenant, as the desk counts them, and also listed in their own row.</p>
{/each}

<style>
  .sum { font-size: 1.1rem; }
  .muted, small { color: var(--muted); font-size: 0.85em; }
</style>
