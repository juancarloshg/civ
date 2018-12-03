# Intro

The initial goal of this project is to try Cypress driven development. This is achieved by following these guidelines:

-   Cypress tests are written before work for a feature is started
-   no manual testing - should be covered by Cypress

# Get started

-   clone the project & `cd` into it
-   `yarn install`
-   `yarn dev` to open the development server & cypress
-   write the Cypress tests
-   make them pass

## About `yarn dev`

This command starts the development server, which will reload when the `src` files change. It also opens the Cypress app, which allows quickly running a specific test.

# What are we coding?

The app being developed is a turn-based strategy game, similar to:

-   [Civilization: Call to Power](https://en.wikipedia.org/wiki/Civilization:_Call_to_Power)
-   [Civilization (series)](<https://en.wikipedia.org/wiki/Civilization_(series)>)
-   [Freeciv](https://en.wikipedia.org/wiki/Freeciv)

# Tips

## Icons

[Flat icon](https://www.flaticon.com/) has a lot of free SVGs (as long as we include the reference to their site).

You can run `npx @svgr/cli -d src/components/icons --icon <svg location here here>` to optimise and generate the React components in `src/components/icons`. You will then have to change the extension to `tsx` and refactor the component.

# More

-   project was bootstrapped with [create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)
-   [cypress docs](https://docs.cypress.io)
-   [ramda docs](https://ramdajs.com/docs/)
-   [redux-saga docs](https://redux-saga.js.org/)
-   [react-redux docs](https://react-redux.js.org/docs/using-react-redux/connect-extracting-data-with-mapstatetoprops)
