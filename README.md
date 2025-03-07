# Instagram Stories - React Application

> A simple Instagram-like stories feature built with **React**, demonstrating story previews, a viewer with navigation, and a progress bar for each story segment.

## Deployed Application

**Live Demo**: [https://instagram-stories-delta.vercel.app/]( https://instagram-stories-delta.vercel.app/)  



## Project Structure


. ├── cypress/ │ ├── e2e/ │ │ └── instagram-stories.cy.ts // Cypress E2E tests │ ├── fixtures/ │ ├── support/ │ │ ├── commands.ts │ │ └── e2e.ts │ └── cypress.config.ts ├── src/ │ ├── components/ │ │ ├── StoryList.tsx │ │ ├── StoryViewer.tsx │ │ ├── ProgressBar.tsx │ │ └── NavigationControls.tsx │ ├── types/ │ │ └── index.ts │ ├── data/ │ │ └── stories.json │ ├── App.tsx │ └── index.tsx ├── public/ ├── package.json ├── tsconfig.json └── README.md


**Key Folders and Files**:
- **`src/components`**: Contains React components for the stories feature (StoryList, StoryViewer, etc.).
- **`src/data/stories.json`**: Mock data of user stories.
- **`src/types`**: TypeScript interfaces for `Story` and `StoriesGroup`.
- **`cypress/`**: Contains Cypress test files and configuration for end-to-end testing.

---

## Getting Started

These instructions will help you set up and run the application and tests on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone or Download** the repository.
2. **Install dependencies**:
   ```bash
   npm install
   or 
   yarn install
   ```
3. **Start the application**:
   ```bash  
   npm start
   ```
    The application will run on `http://localhost:3000`.

4. **Run Cypress E2E tests**:
   ```bash
   npm run cypress:open
   ```
   This will open the Cypress Test Runner. Click on `instagram-stories.cy.ts` to run the tests.

## Design Choices & Performance/Scalability

### Component-Based Architecture

We separated the application into small, reusable components (StoryList, StoryViewer, ProgressBar, and NavigationControls). This keeps the code organized and maintainable as the project grows.

### Efficient Story Loading

- **Conditional rendering of stories**: We only render the story viewer when needed to minimize overhead.
- **Preloading images**: Using an `Image()` object in StoryViewer ensures a smooth viewing experience.

### TypeScript

- **Type safety**: Using TypeScript interfaces (Story, StoriesGroup) ensures type safety and easier refactoring.

### Performance

- **React hooks**: We used React hooks (`useState`, `useEffect`, `useCallback`) to manage stateful logic in a clear, efficient manner.
- **Code splitting**: If the app scales, we can easily integrate React lazy loading to load heavy components or data only when needed.

### Scalability

- **Component addition**: The structure allows easy addition of new components (e.g., new story features).
- **Mock data**: Mock data is stored in `stories.json`; for a real backend, we would fetch from an API and keep the structure largely the same.
- **Cypress E2E tests**: Ensure that additional features and refactors don’t break existing functionality.
