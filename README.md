<h1 align="center">Hero Clash</h1>

<p align="center">Hero Clash is a multiplayer, turn-based strategy game</p>

## Setup

First you will need to install the dependencies using `yarn install` (or the corresponding command of your package manager of choice).

Then you will need to create a .env file at the root of the project using the .env-sample file.

- the `DATABASE_URL` will be the connection string to a MySQL database. If you don't or can't run MySQL locally, I recommend [PlanetScale](https://planetscale.com/)
- the `NUXT_PUSHER_XXX` variables are used for real time events. You will need to create a [Pusher](https://pusher.com/) account for this
- Auth0 is the authentification provider used by this application. You will need to create an account and an application [https://auth0.com/](https://auth0.com/). ⚠️ On your application you will need to set up your allowed callback url to `http://localhost:3000/auth/callback`, and your allowed logout urls, allowed web origins and allowed origins to `http://localhost:3000`. you can do this in the Applications section of your auth0 dashboard.

## Run
- (optionnal) If you are using PlanetScale, you need to open a separate terminal and run the `yarn db:start` command. Note: you need to be logged in through the PlanetScale CLI first using `pscale login`.
- rune the `yarn dev` command. The application will be available on port `3000`.

## Folder Structure

This project is organised into features. Each feature is a full stack slice of the application that will contain its own components, composables, plugins, trpc routes etc. 

You can generate a new feature using the `yarn gen:feature <feature-name>` command. NOTE: After generating a feature you will need to restart your dev server.

In addition of the typical folders you would find in a nuxt project, a feature might contain the following:
- `server/router.ts`: this will be the trpc router for this feature. It is automatically imported and merged into the root trpc router.
- `server/subscribers/index.ts`: As this feature doesn't exist in Prisma, a custom entity subscriber solution has been created to handle better decoupling. This file should export a function installing the sibscribers on the prisma client