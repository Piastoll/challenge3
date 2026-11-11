**Covers 374 reports** from #4471 (support desk export of 4 Oct 2026, 412 unique reports).

## What the reports show
Day and month swap places: a booking for 7 April arrives as 4 July, and 2 December as 12 February. All 11 tenants are hit. Reports come in through every channel (app 202, email 147, form 25). First seen 2026-04-01, last seen 2026-10-04.

## Cause
The shared date parser reads every date month first. All affected tenants write the day first (en-GB, en-IE, nl-NL, cs-CZ, it-IT, fr-FR, pl-PL, da-DK, de-DE, es-ES, pt-PT).

## How the reports were picked
These are the reports from day-first tenants that came in through the app, email, or a booking-v2 form. Reports that are a one-day move (#3) and booking-v3 form reports (#2) are left out. The cause depends on the tenant's locale, not on intake's browser-based tag.

## Fix
Parse dates in the tenant's locale order. This is the fix the desk already has queued for #4471.
