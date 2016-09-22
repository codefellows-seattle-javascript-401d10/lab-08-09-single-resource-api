
// npm i --save superagent
//recipe-test.js -- has tests for get, put, pust, DELETE

'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js'); //starts the server - have to close server be

describe('testing recipe routes', function(){

  var recipe = null;

  describe('testing POST /api/recipe', function(){
    it ('should return a recipe', function(done){
      request.post('localhost:3000/api/recipe')
      .send({name: 'recipe1', content: 'goose'}) //if you pass in done, that means that an error has occurred
      .end((err,res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('recipe1');
        expect(res.body.content).to.equal('goose');
        recipe  = res.body;
        done(); //get this otherwise timeout error
      });
    });

    it ('should return bad request', function(done){
      request.post('localhost:3000/api/recipe')
      .send({})
      .end((err, res) => {
        console.error('res status', res.status);
        expect(res.status).to.equal(400);
        expect(err).to.not.equal(null);
        done();
      });
    });
  });

  //pass a recipe with an id, test for name and content
  describe('testing GET /api/recipe', function(){
    it ('should return a recipe', function(done){
      console.log(recipe);
      request.get(`localhost:3000/api/recipe?id=${recipe.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('recipe1');
          expect(res.body.content).to.equal('goose');
          done();
        });
    });
    it ('should return not found', function(done){
      request.get('localhost:3000/api/recipe?id=1023412938419238471')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it ('should return bad request', function(done){
      request.get('localhost:3000/api/recipe')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('testing DELETE /api/recipe', function(){
    it ('should delete a file', function(done){
      request.delete(`localhost:3000/api/recipe?id=${recipe.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});
