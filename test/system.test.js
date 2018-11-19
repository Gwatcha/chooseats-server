// During the test the env variable is set to test
// This sets our server to use the test database
process.env.NODE_ENV = 'test';

// Using chai for testing server responses
let chai = require('chai'), should = chai.should(), expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../src/app.js');
var requester = chai.request(app).keepOpen();

// Grab test data ( request bodies )
var data = require('./json/testdata.json');
const user1 = data.users[0]; // admin for all rooms
const user2 = data.users[1];
const user3 = data.users[2];
const user4 = data.users[3];
const room1 = data.room1; // single room
const room2 = data.room2; // random room
const room3 = data.room3; // truerandom room
const room4 = data.room4; // ranked room

// ----- Utility Functions for Testing --------

// resets the DB given a valid access token
function resetDB(token) {
  // start deleting
  delService('/restaurants', token);
  delService('/rooms', token);
  delService('/restaurants', token);
  delService('/votes', token);
  delService('/ready', token);
  delService('/users', token);
}

function delService(service, token) {
  const msg = 'should delete '.concat(service,' data');
  it (msg, () => {
    requester
      .del(service)
      .set('Content-Type', 'application/json')
      .send(JSON.strigify(token))
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        user1.userId = res.id;
      });
  });
}

/* function createRoom(type, max, token) {
  requester
    .post('/rooms')
    .set('Content-Type', 'application/json')
    .send()
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      room1. = res.id;
    });
} */

// user is a json object as in json/testdata.json
// this function asserts that the responses do not fail
function createAndAuthUser(user) {
  console.log('inside create and auth user');
  requester
    .post('/users')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(user1.stringify))
    .end(function (err, res) {
      expect(err).to.be.null;
      console.log(err);
      expect(res).to.have.status(200);
      console.log(res);
      user.userId = res.id;
    });

  requester
    .post('/authentication')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(user1.stringify))
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      user1.token = res.body.data;
      console.log(res);
    });
}

// --- END Utility Functions for Testing --------

describe('System Test', () => {
  before(() => {
    // Start up the server and requester
    // const app = require('../../src/app.js');
    // clear out the DB before starting
    describe('reset server', () => {
      createAndAuthUser(user1);
      resetDB(user1.token);
    });

    describe('user creation and authentication', () => {
      it ('should create & login users', () => {
        createAndAuthUser(user1);
        createAndAuthUser(user2);
        createAndAuthUser(user3);
        createAndAuthUser(user4);
      });
    });
  });

  // be sure to close the server before leaving
  after(() => {
    requester.close()
  });



  describe('Two Users in a \'single\' room.', () => {
    it ('should create a max room', () => { /* */ });
  });
});

