// During the test the env variable is set to test
// This sets our server to use the test database 
process.env.NODE_ENV = 'test';

// Using chai for testing server responses
let chai = require('chai'), should = chai.should();
should.equal(true, true);
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

// Start up the server
const app = require('../../src/app.js');
const port = app.get('port');
// const server = app.listen(port);

// Grab current services
// const usersService = require('../src/services/users/users.service.js');
// const roomsService = require('../src/services/rooms/rooms.service.js');
// const messagesService = require('../src/services/messages/messages.service.js');
// const restaurantsService = require('../src/services/restaurants/restaurants.service.js');
// const votesService = require('../src/services/votes/votes.service.js');
// const readyService = require('../src/services/ready/ready.service.js');

// Grab test data ( request bodies )
// const data = JSON.parse('./json/data.json');

describe('Unit Testing', () => {

  // clear out the DB before each test
  beforeEach(() => {
    // chai.request(server)
    //   .send(TOKEN)
    //   .set('Content-Type', 'application/json')
  });

  // authentication Service Test
  describe('authentication Service ', () => {

    // Test proper requests
    describe('proper requests', () => {
    // add here
    });

    // Test improper requests
    describe('improper requests', () => {
    // add here
    });

  });

  // users Service Test
  describe('users Service ', () => {

    // Test proper requests
    describe('proper requests', () => {
    // add here
    });


    // Test improper requests
    describe('improper requests', () => {
    // add here
    });

  });

  // rooms Service Test
  describe('rooms Service ', () => {

    // Test proper requests
    describe('proper requests', () => {
    // add here
    });


    // Test improper requests
    describe('improper requests', () => {
    // add here
    });

  });

  // restaurants Service Test
  describe('rooms Service ', () => {

    // Test proper requests
    describe('proper requests', () => {
    // add here
    });


    // Test improper requests
    describe('improper requests', () => {
    // add here
    });

  });

  // votes Service Test
  describe('votes Service ', () => {

    // Test proper requests
    describe('proper requests', () => {
    // add here
    });


    // Test improper requests
    describe('improper requests', () => {
    // add here
    });

  });

  // ready Service Test
  describe('ready Service ', () => {
    // Test proper requests
    describe('proper requests', () => {
    // add here
    });


    // Test improper requests
    describe('improper requests', () => {
    // add here
    });
  });
});
