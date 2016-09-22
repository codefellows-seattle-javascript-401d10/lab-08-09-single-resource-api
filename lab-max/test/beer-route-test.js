'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing beer routes', function(){
  var beer = null;
  describe('testing unregistered route', function(){
    it('should return a 404 error', function(done){
      request.get('localhost:3000/api/pizza')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        expect(err).to.not.equal.null;
        done();
      });
    });
  });

  describe('testing POST /api/beer', function(){
    it('should return a beer', function(done){
      request.post('localhost:3000/api/beer')
      .send({name: 'rainier', style: 'lager', abv: '4.0'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('rainier');
        expect(res.body.style).to.equal('lager');
        expect(res.body.abv).to.equal('4.0');
        beer = res.body;
        done();
      });
    });
    it('should return a 400 error, bad request', function(done){
      request.post('localhost:3000/api/beer')
      .send({name: 'durr', style: '', abv:'yo'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err).to.not.equal.null;
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing GET /api/beer', function(){
    it('should return a beer', function(done){
      request.get(`localhost:3000/api/beer?id=${beer.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('rainier');
        expect(res.body.style).to.equal('lager');
        expect(res.body.abv).to.equal('4.0');
        done();
      });
    });
    it('should return a 400 error, bad request', function(done){
      request.get('localhost:3000/api/beer')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err).to.not.equal.null;
        expect(res.text).to.equal('bad request');
        done();
      });
    });
    it('should return a 404 error, item not found', function(done){
      request.get('localhost:3000/api/beer?id=12345')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('not found');
        expect(err).to.not.equal.null;
        done();
        res.end();
      });
    });
  });
});
