# CLAUDE.md - Euphrosyne Digilab Project Guidelines

## Build/Development Commands
- `npm run develop` or `npm start` - Start dev server (port 8002)
- `npm run build` - Build production app
- `npm run serve` - Serve built app (port 8002)
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - TypeScript check
- `npm run clean` - Clean Gatsby cache
- `npm run build-plugins` - Build custom plugins

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces for component props
- **Components**: Functional components with hooks (no class components)
- **Imports**: Follow sorted import order (src imports first, then relative)
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Styling**: Use Emotion (CSS-in-JS) with DSFR design system
- **Formatting**: Use Prettier with configured rules
- **Error Handling**: Try/catch blocks with appropriate error messages
- **i18n**: Support for multiple languages (en/fr), use translation hooks

## Project Architecture
- Gatsby-based application with TypeScript
- Page components in src/pages (Gatsby routing)
- Feature-based folder organization
- Shared components in src/components
- OpenSearch for data querying