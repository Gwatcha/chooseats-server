// During the test the env variable is set to test
// This sets our server to use the test database
process.env.NODE_ENV = 'test';

// Using chai for testing server responses
let chai = require('chai'), should = chai.should(), expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../src/app.js').listen(3030);
// const requester = chai.request('localhost:3030').keepOpen();
const requester = chai.request('http://localhost:3030').keepOpen();

// Grab test data ( request bodies )
var data = require('./json/testdata.json');
const user1 = data.users[0]; // admin for all rooms
const user2 = data.users[1];
const user3 = data.users[2];
const user4 = data.users[2];

//now let's login the user before we run any tests
// var user1 = request.agent(app);
// var user2 = request.agent(app);
// var user3 = request.agent(app);
// var user4 = request.agent(app);

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
      .set('Authorization', token )
      .end(function (err, res, body) {
        console.log(body);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        console.log(body);
        done();
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
  console.log('data to send');
  console.log(JSON.stringify(user));
  requester
    .post('/users')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(user))
  
    .end(function (err, res, body) {
      expect(err).to.be.null;
      console.log(err);
      console.log(body);
      expect(res).to.have.status(200);
      user.userId = res.id;
      done();
    });

  requester
    .post('/authentication')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(user1))
    .end(function (err, res, body) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      user1.token = res.body.data;
      console.log(res);
      done();
    });
}



// --- END Utility Functions for Testing --------

describe('System Test', () => {
  before(() => {
    // Start up the server and requester
    // const app = require('../../src/app.js');
    // clear out the DB before starting
    describe('reset server', () => {
      it ('create a new user to reset the server with', () => {
      // requester
      //   .post('/users')
      //   .set('Content-Type', 'application/json')
      //   .send(JSON.stringify(user4))
      
      //   .end(function (err, res) {
      //     expect(err).to.be.null;
      //     console.log(err);
      //     console.log(res);
      //     expect(res).to.have.status(200);
      //     user.userId = res.id;
      //     done();
      //   });

        createAndAuthUser(user3);
      });

      console.log('user token is');
      console.log(user1.token);
      resetDB(user1.token);
    });

    // describe('user creation and authentication', () => {
    //   it ('should create & login users', () => {
    //     createAndAuthUser(user1);
    //     createAndAuthUser(user2);
    //     createAndAuthUser(user3);
    //     createAndAuthUser(user4);
    //   });
    // });
  });

  // be sure to close the server before leaving
  after(() => {
    requester.close();
  });

  describe('Two Users in a \'single\' room.', () => {
    it ('should create a max room', () => {
    //   requester
    //     .post('/rooms')
    //     .set('Content-Type', 'application/json')
    //     .send(JSON.stringify(user1))
    //     .end(function (err, res) {
    //       expect(err).to.be.null;
    //       expect(res).to.have.status(200);
    //       user1.token = res.body.data;
    //       console.log(res);
    //     });
    });
  });


  describe('Four Users in a \'random\' room.', () => {
    it ('should create a random room', () => {
    });
  });
});

