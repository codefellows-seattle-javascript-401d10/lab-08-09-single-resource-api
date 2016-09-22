// 'use strict';
//
const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');
//
//
describe('testing person routes', function(){
  var person = null;

  describe('testing to see if 404 is returned status code for unregisterd routes', function(){
    it(',should return 404 status', function(done){
      request.get('localhost:3000/api/person/badroute')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
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


  describe('testing if status is 200 with valid id', function(){
    it('should return status 200 with valid id', function(done){
      request.get(`localhost:3000/api/person?id=${person.id}`)
    .end ((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.id).to.equal(person.id);
      expect(res.body.name).to.equal(person.name);
      done();
    });
    });
  });


  describe('testing to see if status is 400 with bad request for if no body provided or invalid body', function(){
    it('should return status 400', function(done){
      request.post('localhost:3000/api/person')
      .send({badproperty: 'boo'})
      .end ((err, res) => {
        expect(res.status).equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing #storage.deleteItem', function(){
    it('should delete my ass', function(done){
      request.delete(`localhost:3000/api/person?id=${person.id}`)
      .end ((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });



});
