'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Recipe = require('../model/recipe.js');

module.exports = function(router){
  router.get('/api/recipe', function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem('recipe', req.url.query.id)
      .then( recipe => {
        response.sendJSON(res, 200, recipe);
      })
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, 'not found');
        });
      return;
    }
    response.sendText(res, 400, 'bad request');
  });
  //callback should just create a recipe
  router.post('/api/recipe', function(req, res) {
    try {
      var recipe = new Recipe(req.body.name, req.body.content);
      storage.createItem('recipe', recipe)
      .then( recipe => {
        response.sendJSON(res, 200, recipe);
      })
      .catch( err => {
        console.error(err);
        response.sendText(err, 500, 'server error');
      });
    } catch (err) {
      console.error(err);
      response.sendText(err, 400, 'bad request');
    }
  });

  router.delete('/api/recipe', function(req, res) {
    // try {
    //   storage.deleteItem('recipe', req.url.query.id)
    //   .then( () => {
    //   })
    //   .catch
    //   })
    //   res.sendText(res, 200, 'recipe deleted');
    // } catch (err) {
    //   res.send(err, 404, ' request')

    // }
    if(req.url.query.id){
      storage.deleteItem('recipe', req.url.query.id)
      .then(() => {
        res.sendText(res, 204, 'recipe deleted');
      })
      .catch(err => {
        console.error(err);
        res.sendText(res, 404, 'recipe not found');
      });
    } else {
      res.sendText(res, 400, 'bad request');
    }
  });
};
