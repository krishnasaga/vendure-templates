# WCMS API (Go)

A simple Go API for WCMS page and component data.

## Endpoints

- `GET /pages/` — List all pages
- `GET /pages/:pageId` — Get a single page by ID
- `GET /components` — List all components
- `GET /components/:id` — Get a single component by ID
- `GET /components/type/:id` — Get all components of a given type

## Example Usage

```
GET /pages/
GET /pages/123
GET /components
GET /components/456
GET /components/type/hero
```

---

To implement these endpoints, update your Go server in `main.go` to handle the above routes and return JSON data.
