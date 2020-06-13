module.exports = {
	development: {
		client: 'sqlite3',
		connection: { filename: './database/auth.db3' },
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations',
			tableName: 'dbmigrations',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done);
			},
		},
		seeds: { directory: './database/seeds' },
	},
};
