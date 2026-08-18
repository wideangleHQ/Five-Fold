# Project portfolio

## The governance rule that shapes everything else on this page

The approved content brief states plainly that project credentials — client
name, exact location, capacity — may only be published where Fivefold has
publication permission from that client. This is not a minor caveat. It is the
reason the `Project` type has a `published` boolean at all (see
[Data and content model](data_and_content_model.md)), and it is the reason the
portfolio is built as data-driven rather than hardcoded into JSX: flipping one
field, not editing a component, is what takes a project on or off the live
site.

**Enforce this at the data layer, not the component layer.** Whatever reads
`src/data/projects.ts` for the grid or for any homepage preview should filter
out `published: false` records before the list reaches a component — do not
rely on a component-level `if (project.published)` check, because that pattern
is easy to forget on the next screen that needs the same list (a homepage
teaser, a sitemap generator, a search index).

## Categories

`All | Industrial | Commercial | Institutional | Government`

## Reference data from the approved brief

Publication status for every row below is unresolved. Nothing here should
reach the live site with `published: true` until it is confirmed — see
[Client confirmations](client_confirmations.md).

| Client | Location | Capacity |
| --- | --- | --- |
| GSI | Bhubaneswar | 98 kWp |
| RMNH | Bhubaneswar | 200 kWp |
| Loyola School | Bhubaneswar | 99.84 kWp |
| Mind Tree | Bhubaneswar | 550.5 kWp |
| MCC | Hyderabad | 512 kWp |
| IOCL | Malda | 100 kWp |
| Jindal | West Bengal | 1,980 kWp |
| IOCL | Paradip | 110 kWp |
| Pepsico | Hyderabad | 244.5 kWp |

## Adding a project

1. Add the record to `src/data/projects.ts` with `published: false`.
2. Get written client permission to publish the name, location, and capacity.
3. Flip `published: true` only once that permission exists.

## Removing or hiding a project

Prefer `published: false` over deleting the record — it keeps the history
without exposing it. Delete outright only if the client asks for the record
itself to be gone, not just hidden.

## UI

Card grid, not a table:

```
[ project image ]
Client
Location
Capacity — e.g. "550.5 kWp, Bhubaneswar, Odisha"
```

Click through to a detail modal or page. Filtering happens client-side against
the already-filtered (published-only) dataset.
