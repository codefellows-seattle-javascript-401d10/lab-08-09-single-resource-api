'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Book = require('../model/book.js');

module.exports = function(router){
  //should return an already existing book
  router.get('/api/book', function(req, res){
    if(req.url.query.id){
      storage.fetchItem('book', req.url.query.id)
      .then(book => {
        response.sendJSON(res, 200, book);
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  //should create a book on the storage
  router.post('/api/book', function(req, res){
    try {
      var book = new Book(req.body.title, req.body.author, req.body.description);
      storage.createItem('book', book);
      response.sendJSON(res, 200, book);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });

  //should delete an already existing book
  router.delete('/api/book', function(req, res){
    if(req.url.query.id){
      storage.deleteItem('book', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'no content');
      })
      .catch(err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
};
