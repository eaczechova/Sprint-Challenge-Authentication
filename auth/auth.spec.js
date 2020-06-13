const db = require('../database/dbConfig.js');
const Users = require('../users/users-model.js');
const server = require('../api/server.js');
const request = require('supertest');

describe('checks authentication', () => {
	describe('test post /register', () => {
		it('should add provided user credentials into the DB', async () => {
			await Users.add({ username: 'ewa', password: 12345 });
			await Users.add({ username: 'test', password: 12345 });

			const users = await db('users');
			expect(users).toHaveLength(2);
		});

		it('should return what was inserted', async () => {
			let user = await Users.add({ username: 'ewa', password: 12345 });
			expect(user.username).toEqual('ewa');

			user = await Users.add({ username: 'helen', password: 12345 });
			expect(user.username).toEqual('helen');
		});
	});

	describe('test post /login', () => {
		it('should return a username to the user after its successful login', async () => {
			await Users.add({ username: 'ewa', password: 12345 });
			const user = await Users.findById(1);

			expect(user.username).toBe('ewa');
		});

		it('should return a welcome message to the user after its successful login', async () => {
			await Users.add({ username: 'ewa', password: 12345 });
			const user = await Users.findBy({ username: 'ewa' });

			expect(user).toHaveLength(1);
		});
	});
});

beforeEach(async () => {
	await db('users').truncate();
});
