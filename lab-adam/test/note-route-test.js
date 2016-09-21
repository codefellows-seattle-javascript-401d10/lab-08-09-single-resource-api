'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing character routes', function(){
  before('populating storage with dummy data', function(done){
    request.post('localhost:3000/api/character')
    .send({name:'Roger Rabbit', height: 123, weight: 103, saying:'ehh whats up doc'})
    .end((err) => {
      if(err) return done(err);
      done();
    });
  });
  var character = null;
  describe('testing POST /api/character', function(){
    it('should create a new character', function(done){
      request.post('localhost:3000/api/character')
      .send({name: 'Bugs Bunny', height: 176, weight: 175, saying: 'th th thats all folks!'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Bugs Bunny');
        expect(res.body.height).to.equal(176);
        expect(res.body.weight).to.equal(175);
        expect(res.body.saying).to.equal('th th thats all folks!');
        character = res.body;
        done();
      });
    });
    it('should return a 400 if no body provided', function(done){
      request.post('localhost:3000/api/character')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('testing GET /api/character', function(){
    it('should return a character', function(done){
      request.get(`localhost:3000/api/character?id=${character.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Bugs Bunny');
        expect(res.body.height).to.equal(176);
        expect(res.body.weight).to.equal(175);
        expect(res.body.saying).to.equal('th th thats all folks!');
        character = res.body;
        done();
      });
    });
    it('should return a 404 status code for invalid IDs', function(done){
      request.get('localhost:3000/api/character?id=foobar')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    it('should return a 400 SC if no ID provided', function(done){
      request.get('localhost:3000/api/character')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should return an array of available IDs for GET requests w/no ID', function(done){
      request.get('localhost:3000/api/character')
      .end((err, res) => {
        expect(res.body).to.be.instanceOf(Array);
        done();
      });
    });
  });
  describe('server response for not found routes', function(){
    it('should return a 404 error for unregistered routes', function(done){
      request.get('localhost:3000/foo/bar?id=wtf')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
