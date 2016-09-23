'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Recipe = require('../model/recipe.js');

module.exports = function(router){
  //retrieving a file from storage given an id
  router.get('/api/recipe', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('recipe', req.url.query.id)
      .then( recipe => {
        response.sendJSON(res, 200, recipe);
      })
      .catch( err => {
        console.error(err);
        response.sendText(res, 404, 'not found');
      });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  //adding a file to storage with a name and content
  router.post('/api/recipe', function(req,res) {
    try {
      var recipe = new Recipe(req.body.name, req.body.content, req.body.type, req.body.day);
      storage.createItem('recipe', recipe);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(recipe));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
//deleting a file from storage with a specified id
  router.delete('/api/recipe', function(req,res) {
    try {
      storage.deleteItem('recipe', req.url.query.id);
      res.statusCode = 204; //no content -ok
      res.end();
    } catch (err) {
      console.error(err); //shows up on the server
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    }
  });
};
