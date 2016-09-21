'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing journal rotues', function(){
  var journal = null;

  describe('testing POST /api/journal', function(){
    it('should return a journal', function(done){
      request.post('localhost:3000/api/journal')
      .send({headline: 'hello', article: 'good bye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.headline).to.equal('hello');
        expect(res.body.article).to.equal('good bye');
        journal = res.body;
        done();
      });
    });
  });

  describe('testing POST /api/journal', function(){
    it('should return bad request for invalid body', function(done){
      request.post('localhost:3000/api/journal')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing GET /api/journal', function(){
    it('should return a journal', function(done){
      request.get(`localhost:3000/api/journal?id=${journal.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.headline).to.equal('hello');
        expect(res.body.article).to.equal('good bye');
        console.log(res.body);
        done();
      });
    });
  });

  describe('testing GET /api/journal', function(){
    it('should return bad request if no id was provided', function(done){
      request.get('localhost:3000/api/journal')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err).to.equal.null;
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing GET /api/journal', function(){
    it('should return not found if id is not valid', function(done){
      request.get('localhost:3000/api/journal?id=678')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });
  });

});
