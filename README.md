![CI](https://github.com/emonakov/randomuser/workflows/CI/badge.svg?branch=main) [![codecov](https://codecov.io/gh/emonakov/randomuser/branch/main/graph/badge.svg?token=P2SKL1SBI2)](https://codecov.io/gh/emonakov/randomuser)

# Feedback

Challenge<br />

✅ Displays a list of users<br />

✅ Allows searching for users<br />

✅ Allows the selection of nationalities in the Settings page<br />

✅ Loading message is shown while loading results<br />

✅ "End of users catalog" message is shown when the user has scrolled to the end of the list<br />

Extra points<br />

✅ Detail modal with the user info<br />

✅ The selected nationality is persisted in browser's local storage<br />

✅ Pre-fetch results<br />

✅ / 🚫 Allows searching for several fields (address, city, state, postcode, name) with a certain level of fuzziness, but sometimes the UX behavior is weird<br />

Good

✅ Tooling (eslint, prettier, husky)<br />

✅ TypeScript<br />

✅ Uses React Context API + hooks<br />

✅ Uses Redux selectors<br />

✅ Tests with React Testing Library, with good coverage<br />

✅ Uses new JavaScript features, such as nullish coalescing operator<br />

✅ .env file with configuration variables<br />

✅ Clear instructions about how to prepare and run the project<br />

✅ Github Actions CI workflow<br />

Not so good / could be better

🚫 Code readability is sometimes affected by the usage of ternary operators, specially in JSX. Extracting the logic to constants with proper names would have been better.<br />

🚫 All the state lives in the same "slice" (which is a piece of state in redux-toolkit). At least the settings related state (in this case, the selected nationalities) could have been moved to a different "slice".<br />

🚫 File structure could be better, since the file structure used will be hard to scale (e.g. tests are not close to components, all the components live in the same folder). The file with the types definitions (StateInterface.ts) seems a bit lost, so maybe breaking the different types into several files inside a types folder could have been a better choice.<br />

🚫 The usage of a11y title attributes could be better. Titles such as "full name" or a "A user card" doesn't seem very useful in terms of accessibility.<br />

🚫 Emojis could be replaced with proper icons/svgs to ensure a consistent UX across different browsers and platforms.<br />

🚫 Has a README based on CRA + tools used in the challenge. Doesn't have any documentation related to the project, technical decisions/overview, implemented features, etc.<br />

🚫 Even though there are several commits, the style of the commit messages changes a lot and most of them are not very descriptive/helpful.<br />

🚫 Partially responsive: number of columns properly adapt to the size of the screen, but some of the content overflows which breaks the responsive experience.<br />

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Libraries

### redux-toolkit
Getting rid of the boilerplate
### react-query
Working with the network state
### react-router
Application routing
### axios
Http calls
### minisearch
Full text client-side engine
### react-intersection-observer
To follow the infinite scroll
### Husky
For git hooks and running checks

## Design system

### Styled-components
### Grommet v2
Design system based on styled components

## Preconditions

### Copy .env.example to .env
`cp .env.example .env`

## Available Scripts

In the project directory, you can run:
    
### `yarn prettier`

To make code look pretty

### `yarn postinstall`

It runs automatically every time npm or yarn installs project's dependencies

### `yarn ts:check`

Checks the quality of the typescript code based on the tsconfig.ts

### `yarn test:ci`

Runs tests in the CI environment

### `yarn test:coverage`

Creates coverage istanbul.js coverage report and saves it into `coverage` directory

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands exc
