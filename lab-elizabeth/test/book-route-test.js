'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing book routes', function(){
  var book = null;

  describe('testing POST /api/book', function(){
    it('should create a book', function(done){
      request.post('localhost:3000/api/book')
      .send({
        author: 'C.S.Lewis',
        title: 'The Magicians Nephew',
        description: 'Something about Narnia',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('C.S.Lewis');
        expect(res.body.title).to.equal('The Magicians Nephew');
        expect(res.body.description).to.equal('Something about Narnia');
        book = res.body;
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.post('localhost:3000/api/book')
      .send({})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing GET /api/book', function(){
    it('should return a book', function(done){
      request.get(`localhost:3000/api/book?id=${book.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('C.S.Lewis');
        expect(res.body.title).to.equal('The Magicians Nephew');
        expect(res.body.description).to.equal('Something about Narnia');
        done();
      });
    });

    it('should return status 404: not found', function(done){
      request.get('localhost:3000/api/book?id=hippocampus')
      .send({})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        done();
      });
    });

    it('should return status 400: bad request', function(done){
      request.get('localhost:3000/api/book')
      .send({})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

});
