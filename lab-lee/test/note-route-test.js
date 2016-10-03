'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const storage = require('../lib/storage');
const Duck = require('../model/duck')

require('../server.js');

describe('testing note routes', function() {
  var note = null;

  describe('testing POST /api/note', function() {

    it('should return a note', function(done) {
      request.post('localhost:3000/api/note')
      .send({name: 'hello', content: 'goodbye'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('goodbye');
        note = res.body;
        done();
      });
    });

    it('should 400 bad request', function(done) {
      request.post('localhost:3000/api/note')
      .send({name: '', content: ''})
      .end((res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing GET /api/note', function(){
    var duck;
    before(done => {
      newDuck = Duck.createDuck({
        name: 'larry',
        color: 'blue',
        feathers: '15',
      });
      storage.createItem('note', note)
      .then(note => done())
      .catch(err => done(err));
    });

    after(done => {
      storage.deleteItem('note', '1234')
      .then(() => done())
      .catch(err => done(err))
    });

    it()
  });

  describe('with valid query', function(){

    it('should return a note', function(done){

      request.get('localhost:3000/api/note?id=1234')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('hello');
        expect(res.body.content).to.equal('goodbye');
        done();
      });
    });
    it('should return 404 not found', function(done){
      request.get('localhost:3000/api/note?id=not-exist')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should return 400 bad request', function(done){
      request.get('localhost:3000/api/note?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('testing DELETE /api/note', function(){
    it('should delete a note', function(done){
      request.delete(`localhost:3000/api/note?id=${note.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
    it('should return 404 not found', function(done){
      request.delete('localhost:3000/api/note?id=not-exist')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
