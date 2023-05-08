// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/recipes.sqlite3',
      pool:{
        afterCreate: (conn, cb) =>
          conn.run('PRAGMA foreign_keys = ON', cb)
    }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    useNullAsDefault: true,
  },

  testing: {
  },

  production: {
  }

};
