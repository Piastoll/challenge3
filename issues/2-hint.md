**Covers 33 reports** from #4471 (support desk export of 4 Oct 2026, 412 unique reports).

## What the reports show
The same day/month swap as #1 ("booked for 6 August, two people showed up on 8 June"). Every one of these reports came through the **booking-v3 form** of a day-first tenant: alder.physio (de-DE), copper.studio (es-ES) and pale.harbour (pt-PT). First seen 2026-04-17, last seen 2026-09-22.

## Cause
booking-v3 prints the hint `MM/DD/YYYY` under its date field. People type the month first because the hint tells them to. The form then reads the input in the tenant's day-first order, and the date flips. booking-v2 prints `DD/MM/YYYY` and doesn't have this problem.

## Why it needs its own ticket
The queued parser fix (#1) doesn't touch the booking-v3 hint. When it ships, these reports keep coming. Intake tagged only some of them `hint`, because it guesses from the reporter's browser locale and not from the tenant.

## Fix
Print the tenant's own date order in the booking-v3 hint, or read the field in the order the hint asks for.
