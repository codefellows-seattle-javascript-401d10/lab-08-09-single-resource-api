'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing note rotues', function(){
  var person = null;


  describe('testing POST /api/person', function(){
    it('save a Person - POST', function(done){
      request.post('localhost:3000/api/person')
      .send({name: 'rozi', sex: 'male'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('rozi');
        expect(res.body.sex).to.equal('male');
        person = res.body;
        done();
      });
    });
  });

// GET - test 404, responds with 'not found' for valid request made with an id that was not found
  describe('testing GET /api/person', function(){
    it('return an error with unValid ID - GET', function(done){
      request.get('localhost:3000/api/person?id=111')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

  // GET - test 400, responds with 'bad request' if no id was provided in the request
  describe('testing GET /api/person', function(){
    it('return an error with no id - GET', function(done){
      request.get('localhost:3000/api/person')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
  
  // GET - test 200, response body like {<data>} for a request made with a valid id

});