# Development Guide

## Coding Standards

- Use TypeScript for all code
- Follow ESLint and Prettier rules
- Use Tailwind CSS utility classes for styling
- Use shadcn/ui components for UI consistency

## Branching & Commits

- Use feature branches: `feature/<name>`
- Use descriptive commit messages
- Pull request required for all merges to main

## Testing

- Run `npm run typecheck` and `npm run lint` before pushing
- Manual feature testing for all user flows
- (Optional) Add automated tests with Playwright or Cypress

## Architecture Decisions

- Next.js App Router for routing and layouts
- Supabase for backend (DB, Auth, Storage)
- All API logic in `/app/api` routes
- Responsive, mobile-first design

## Contributing

- Fork the repo and create a feature branch
- Follow the setup guide in [SETUP.md](./SETUP.md)
- Open a pull request with a clear description

---

See [README.md](./README.md) for overview, [FEATURES.md](./FEATURES.md) for features, and [SETUP.md](./SETUP.md) for setup.
