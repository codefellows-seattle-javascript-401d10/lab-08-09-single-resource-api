'use strict';

const response = require('../lib/response');
const storage = require('../lib/storage');
const Cat = require('../model/cat');

module.exports = function(router){

  router.get('/api/cat', function(req, res){
    if (req.url.query.id) {
      storage.fetchItem('cat', req.url.query.id)
      .then( cat => {
        response.sendJson(res, 200, cat);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'Id not found!');
      });
      return;
    }
    response.sendText(res, 400, 'Bad request!');
  });

  router.post('/api/cat', function(req, res){
    try {
      var cat = new Cat(req.body.name, req.body.breed);
      storage.createItem('cat', cat);
      response.sendJson(res, 200, cat);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'Bad request!');
    }
  });

  router.delete('/api/cat', function(req, res){
    if (req.url.query.id) {
      storage.deleteItem('cat', req.url.query.id)
      .then(() => {
        response.sendText(res, 204, 'This message will not write.');
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 400, 'Not found! Need id');
      });
    }
  });
};
