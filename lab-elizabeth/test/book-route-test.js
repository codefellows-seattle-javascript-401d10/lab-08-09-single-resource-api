'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('testing book routes', function(){
  // var book = null;

  describe('testing POST /api/book', function(){
    it('should return a book', function(done){
      request.post('localhost:3000/api/book.js')
      .send({
        author: 'C.S.Lewis',
        title: 'The Magician\'s Nephew',
        description: 'Something about Narnia.',
      })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.author).to.equal('C.S.Lewis');
        expect(res.body.title).to.equal('the Magician\'s Nephew');
        expect(res.body.description).to.equal('Something about Narnia');
        // book = res.body;
        done();
      });
    });
    // it('should report a missing author', function(done){
    //   request.post('localhost:3000/api/book.js')
    //   .send({
    //     author: null,
    //     title: 'The Magician\'s Nephew',
    //     description: 'Something about Narnia.',
    //   })
    //   .end((err, res) => {
    //     if(err) return done(err);
    //     expect(res.status).to.equal(400);
    //     expect(res.write).to.equal('bad request');
    //     done();
    //   });
    // });
    // it('should report a missing title', function(done){
    //   request.post('localhost:3000/api/book.js')
    //   .send({
    //     author: 'C.S.Lewis',
    //     title: null,
    //     description: 'Something about Narnia.',
    //   })
    //   .end((err, res) => {
    //     if(err) return done(err);
    //     expect(res.status).to.equal(400);
    //     expect(res.write).to.equal('bad request');
    //     done();
    //   });
    // });
    // it('should report a missing description', function(done){
    //   request.post('localhost:3000/api/book.js')
    //   .send({
    //     author: 'C.S.Lewis',
    //     title: 'The Magician\'s Nephew',
    //     description: null,
    //   })
    //   .end((err, res) => {
    //     if(err) return done(err);
    //     expect(res.status).to.equal(400);
    //     expect(res.write).to.equal('bad request');
    //     done();
    //   });
    // });
  });

});
