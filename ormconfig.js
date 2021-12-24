const { getMetadataArgsStorage } = require("typeorm");

module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'mysqluser',
  password: 'P@ssw0rd!',
  database: 'realworld_db',
  synchronize: false,
  entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
  timezone: 'Z',
  bigNumberStrings: false,
  migrations: ["migrations/*.js"],
  migrationsRun: false,
  cli: {
    migrationsDir: "migrations"
  },
  extra: {
    // connectionLimit: 5
  }
}