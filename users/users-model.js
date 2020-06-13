const db = require('../database/dbConfig.js');

function find() {
	return db('users').select('id', 'username');
}

function findBy(name) {
	return db('users').where(name);
}

async function add(user) {
	const [id] = await db('users').insert(user, 'id');
	return findById(id);
}

function findById(id) {
	return db('users').where({ id }).first();
}

module.exports = {
	find,
	findBy,
	add,
	findById,
};
