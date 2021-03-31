# ![RealWorld Example App](logo.png)

> ### [Nx monorepo](https://nx.dev) with [Nestjs](https://nestjs.com) and [Angular](https://angular.io) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


This codebase was created to demonstrate a fully fledged fullstack application built with **[Nx monorepo](https://nx.dev), [Nestjs](https://nestjs.com) and [Angular](https://angular.io)** including CRUD operations, authentication, routing, pagination, and more.

# Getting started

*Prerequisites: To run this project locally, you need to have [Nodejs](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed on your operating system, remember to start your MySQl server also.*

**Clone this project**

`git clone https://github.com/nhaancs/fullstack-nx-nestjs-angular-realworld.git`

**Switch to the repo folder**

`cd fullstack-nx-nestjs-angular-realworld`

**Install dependencies**

`npm install`

**Update below configs in `ormconfig.js` file to your database configs**

`host`, `port`, `username`, `password`, `database`

**Run migrations**

`npm run migration:run`

**Start both server (api) and client (conduit) apps**

`npm run serve:api-conduit`

**Open browser at [http://localhost:4200](http://localhost:4200)**

# How it works

