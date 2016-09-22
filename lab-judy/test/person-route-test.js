'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const mocha = require('mocha');
const gulp = require('gulp');

require('../server.js');

// write a test to ensure that your api returns a status code of 404 for routes that have not been registered
//TODO: Test not passing, why?
var person = null;
describe('testing person routes', function(){
  describe('testing to see if 404 is returned status code for unregisterd routes', function(){
  it(',should return 404 status', function(done){
    request.get('localhost:3000/api/person/badroute')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
      // if (err) return done(err);
    });
  });
});
  describe('testing to see if a person is returned', function(){
    it('should return a person', function(done){
      request.post('localhost:3000/api/person')
      .send({name: 'judy', age: '21'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('judy');
        expect(res.body.age).to.equal('21');
        person = res.body;
        done();
      });
    });
  });
});
// TODO: `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
describe('testing for bad id', function(){
  it('should return status 404 due to bad id', function(done){
    request.get('localhost:3000/api/person/id=badID#')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      expect(res.text).to.equal('not found');
      done();
    });
  });
});
// `GET` - test 400, responds with 'bad request' if no id was provided in the request
describe('testing to see if status code is 400 if no id was provided in request', function(){
  it('should return status 400 if no id in request', function(done){
    request.get('localhost:3000/api/person')
    .end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.text).to.equal('bad request');
      done();
    });
  });
});
// `GET` - test 200, response body like `{<data>}` for a request made with a valid id// TODO: Fix this
describe('testing if status is 200 with valid id', function(){
  it('should return status 200 with valid id', function(done){
    request.get(`localhost:3000/api/person/?id=${person.id}`)
    .end ((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(person.id);
      done();
    });
  });
});
