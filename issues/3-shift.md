**Covers 5 reports** from #4471 (support desk export of 4 Oct 2026, 412 unique reports): R-41202, R-41209, R-41236, R-41344, R-41620.

## What the reports show
The month stays the same and the day moves by one:
- "Invite says Tuesday 12 May. Calendar says Monday 11 May." (R-41202)
- "Every booking in June is one day off. Only June." (R-41209)
- "The invite arrived before I made the booking." (R-41236)
- "Client in Lisbon got Tuesday. Client in Toronto got Monday. Same meeting." (R-41344)
- "Tuesday 6 October showed as Monday." (R-41620)

A day/month swap can't produce this. The desk already marked these reports as one-day moves (`desk-notes.json` → `oneDayMove`), but they stayed counted under the parser cause because of their tenant.

## Likely cause
Time zone or DST handling when the invite date is computed: a date-only value is converted through UTC or the recipient's zone. Five tenants are affected, over app and email. First seen 2026-04-02, last seen 2026-10-04.

## Fix
Keep booking dates as calendar dates in the tenant's time zone, and convert to the recipient's zone only for timed events.
