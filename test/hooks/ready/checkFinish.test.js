const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');

const checkFinish = require('../../../src/services/ready/hooks/checkFinish.js');

describe('\'populate-user\' hook', () => {
  let app, user;

  beforeEach(async () => {
    // Database adapter pagination options
    const options = {
      paginate: {
        default: 10,
        max: 25
      }
    };

    app = feathers();

    // Register needed services
    app.use('/users', memory(options));
    app.use('/ready', messagesmemory(options));
    app.use('/rooms', memory(options));

    // Add the hook to the dummy service
    app.service('ready').hooks({
      after: checkFinish()
    });

    // Create fictious room scenario 1
    user = await app.service('users').create({
      email: 'test@user.com'
    });

    // Create a new room
  });

  it('populates a new message with the user', async () => {
    const message = await app.service('messages').create({
      text: 'A test message',
      // Set `userId` manually (usually done by `process-message` hook)
      userId: user.id
    });

    // Make sure that user got added to the returned message
    assert.deepEqual(message.user, user);
  });
});
