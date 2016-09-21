'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing todo rotues', function(){
  var todo = null;

  describe('testing POST /api/todo', function(){
    it('should return a todo', function(done){
      request.post('localhost:3000/api/todo')
      .send({item: 'hello', date: 'good bye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.item).to.equal('hello');
        expect(res.body.date).to.equal('good bye');
        todo = res.body;
        done();
      });
    });
  });

  describe('testing GET /api/todo', function(){
    it('should return a todo', function(done){
      request.get(`localhost:3000/api/todo?id=${todo.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.item).to.equal('hello');
        expect(res.body.date).to.equal('good bye');
        done();
      });
    });
  });

  describe('testing GET /api/todo', function() {
    it('should return not found if id was not found', function(done){
      request.get(`localhost:3000/api/todo?id=${todo.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.body).to.equal('not found');
      });
    });
  });
