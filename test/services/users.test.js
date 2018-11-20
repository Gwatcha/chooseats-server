const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {

  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password', async () => {
    const email = 'testaccount2142@example.com';
    const password = 'password1';

    const user = await app.service('users').create({
      email: email,
      password: password
    });

    assert.ok(user.email === email);
    assert.ok(user.password !== 'secret');

    const params = { user };
    await app.service('users').remove(user.id, params);
  });

  it('creates a user with username', async () => {
    const email = 'testaccount1232123@example.com';
    const password = 'password1';
    const username = 'bob';

    const user = await app.service('users').create({
      email,
      password,
      username
    });

    assert.ok(user.username === username);

    const params = { user };
    await app.service('users').remove(user.id, params);
  });

  it('returns error when email is invalid', async () => {
    const email = 'testaccount';
    const password = 'password1';
    try {
      const user = await app.service('users').create({
        email: email,
        password: password
      });
    } catch (error) {
      assert.ok(error.errors.email === 'Invalid email address');
    }
  });

  it('returns error when email is invalid', async () => {
    const password = 'password1';
    try {
      const user = await app.service('users').create({
        password: password
      });
    } catch (error) {
      assert.ok(error.errors.email === 'Email address is required');
    }
  });

  it('returns error when password is too short', async () => {
    const email = 'testaccount@test.com';
    const password = 'pass';
    try {
      const user = await app.service('users').create({
        email: email,
        password: password
      });
    } catch (error) {
      assert.ok(error.errors.password === 'Password is too short');
    }
  });

  it('returns error when password is missing', async () => {
    const email = 'testaccount@test.com';
    try {
      const user = await app.service('users').create({
        email: email
      });
    } catch (error) {
      assert.ok(error.errors.password === 'Password is required');
    }
  });

  it('removes password for external requests', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    const user = await app.service('users').create({
      email: 'testaccount123@example.com',
      password: 'secretpassword'
    }, params);

    // Make sure password has been removed
    assert.ok(!user.password);

    await app.service('users').remove(user.id, { user });
  });
});
