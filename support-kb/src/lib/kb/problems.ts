// What a ticket actually holds, problem by problem. causes.ts decides parser vs hint by tenant;
// this file adds what the bodies show and the tenant can't: a booking that moved by one day did
// not have its day and month swapped. The desk already read those reports (desk-notes.json).
import { causeOf, uniqueById, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = 'parser' | 'hint' | 'shift' | 'unplaced';

export const PROBLEMS: Record<Problem, { name: string; shows: string }> = {
  parser: {
    name: 'Shared parser reads day-first dates month first',
    shows: 'Day and month swapped: 7 April arrives as 4 July. Any channel, any day-first tenant.',
  },
  hint: {
    name: 'booking-v3 form hint says MM/DD/YYYY to day-first tenants',
    shows: 'People type month first because the hint tells them to; the form reads it day first.',
  },
  shift: {
    name: 'Bookings move by one day across time zones',
    shows: 'Same month, one day off — Tuesday shows as Monday. A swap cannot do that.',
  },
  unplaced: { name: 'No tenant on file', shows: 'Cannot be placed without a tenant.' },
};

export function problemOf(r: Report, t: Tenant | undefined, shiftIds: readonly string[]): Problem {
  if (shiftIds.includes(r.id)) return 'shift';
  return causeOf(r, t) ?? 'unplaced';
}

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  tenants: number;
  channels: Record<string, number>;
  firstSeen: string;
  lastSeen: string;
};

export function splitTicket(
  all: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  shiftIds: readonly string[],
): { total: number; groups: ProblemGroup[] } {
  const merged = uniqueById(all).filter((r) => r.mergedInto === ticket);
  const by = new Map<Problem, Report[]>();
  for (const r of merged) {
    const p = problemOf(r, tenantOf(r), shiftIds);
    by.set(p, [...(by.get(p) ?? []), r]);
  }
  const groups = [...by.entries()]
    .map(([problem, rs]) => {
      const days = rs.map((r) => r.receivedAt.slice(0, 10)).sort();
      return {
        problem,
        reports: rs,
        tenants: new Set(rs.map((r) => r.tenant)).size,
        channels: rs.reduce<Record<string, number>>((n, r) => ({ ...n, [r.channel]: (n[r.channel] ?? 0) + 1 }), {}),
        firstSeen: days[0],
        lastSeen: days[days.length - 1],
      };
    })
    .sort((a, b) => b.reports.length - a.reports.length);
  return { total: merged.length, groups };
}
