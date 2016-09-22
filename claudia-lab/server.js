'use strict';

//node modules
const http = require('http');
//npm modules
//app constants
const Recipe = require('./model/recipe.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
//module constants
const PORT = process.env.PORT || 3000;
const router = new Router(); //make a new router out of the constructor

//MODULE LOGIC
//we are creating 2 routes with different functionality
router.get('/api/recipe', function(req, res) { //the get reads
  if (req.url.query.id) {
    storage.fetchItem('recipe', req.url.query.id) //pass in id to get a specific recipe....if id is passed in you check the storage for a recipe
    .then( recipe => {
      res.writeHead(200, {
        'Content-type': 'application/json',
      });
      res.write(JSON.stringify(recipe));
      res.end();
    })
    .catch( err => {
   // if you make the right request but the id wasn't there (no recipe)
  // console.error(err); //log so server knows whats going on
      console.error(err);
      res.writeHead(400, { //if the request wasn't correct
        'Content-type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
    return;
  } //make a get request
  //  console.error(err);
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

//single function for single route- in this case it creates
//creates  and stores it in the storage module
router.post('/api/recipe', function(req,res){ //the post creates something
  try {
    var recipe =  new Recipe(req.body.name, req.body.content);
    storage.createItem('recipe', recipe);
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.write(JSON.stringify(recipe));
    res.end();
  } catch (err) {
    console.error(err); //log so server knows whats going on
    res.writeHead(400, {
      'content-type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
}); //make a post request

router.delete('/api/recipe', function(req,res){ //the post creates something
  try {
    var recipe =  new Recipe(req.body.name, req.body.content);
    storage.createItem('recipe', recipe);
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.write(JSON.stringify(recipe));
    res.end();
  } catch (err) {
    console.error(err); //log so server knows whats going on
    res.writeHead(400, {
      'content-type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
}); //make a post request

const server = http.createServer(router.route());
//server is listenng

server.listen(PORT, function(){
  console.log('server up::', PORT);
});

//in client [http :3000] [http:3000/api/recipe]

// [recipe-json form] | http post:3000/api/recipe
//cat [jsonfile] | http post:3000/api/recipe
//to get id, after recipe do space id==[copy id from recipe]s
