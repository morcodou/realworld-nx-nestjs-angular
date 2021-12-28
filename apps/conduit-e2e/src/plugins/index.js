// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
const { knex } = require("knex");

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config));


  require('../use-browserify-istanbul');
  
  require('@cypress/code-coverage/task')(on, config);

  on('task', {

    cleanDatabase() {
      const database = knex({
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'mysqluser',
          password: 'P@ssw0rd!',
          database: 'realworld_db'
        }
      });

      const onError = err => err.toString().includes('no such table') ? null : Promise.reject(err)

      return Promise.all([
        database
          .truncate('article')
          .catch(onError),
        database
          .truncate('comment')
          .catch(onError),
        database
          .truncate('favorite')
          .catch(onError),
        database
          .truncate('tag')
          .catch(onError),
        database
          .truncate('follow')
          .catch(onError),
      ]);
    },

    cleanUserVisitor() {
      const database = knex({
        client: 'mysql',
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'mysqluser',
          password: 'P@ssw0rd!',
          database: 'realworld_db'
        }
      });

      return Promise.all([
        database.table('user')
          .where('email', 'visitor@email.com')
          .del()
      ]);
    }

  });

  return config;
};
