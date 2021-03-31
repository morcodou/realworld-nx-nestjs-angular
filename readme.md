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

**Open your browser at [http://localhost:4200](http://localhost:4200)**

## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo over at https://angular.realworld.io

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Uses JWT (store the token in localStorage)
    - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles
# How it works

