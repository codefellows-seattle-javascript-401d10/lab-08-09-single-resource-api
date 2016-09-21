'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing todo rotues', function(){
  var todo = null;

  describe('testing POST /api/todo', function(){
    it('should return a todo', function(done){
      request.post('localhost:3000/api/todo')
      .send({name: 'hello', content: 'good bye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
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
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('good bye');
        done();
      });
    });
  });
});
