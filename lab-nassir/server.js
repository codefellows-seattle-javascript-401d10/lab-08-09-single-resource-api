'use strict';

//node modules
const http = require('http');
//npm modules
//app modules
const Cat = require('./model/cat');
const Router = require('./lib/router');
const storage = require('./lib/storage');
//module constants
const router = new Router();
const PORT = process.env.PORT || 3000;
//module logic

router.get('/api/cat', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('cat', req.url.query.id)
    .then( cat => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(cat));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.write('Id not found!');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('Bad request!');
  res.end();
});

router.post('/api/cat', function(req, res){
  try {
    var cat = new Cat(req.body.name, req.body.breed);
    storage.createItem('cat', cat);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(cat));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('Bad request!');
    res.end();
  }
});

router.delete('/api/cat', function(req, res){
  if (req.url.query.id) {
    storage.deleteItem('cat', req.url.query.id)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'text/plain',
      });
      res.write('This message will not write.');
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('Not found! Need id');
      res.end();
    });
  }
});


const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('Welcome to CatAPI, the world\'s least functional cat-based API!\nRemember the CatAPI motto: We exist and owe you no explanation why!(tm)\nThe server is working. Meow.\nListening on PORT', PORT);
});
