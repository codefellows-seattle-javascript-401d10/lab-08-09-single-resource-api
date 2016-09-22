'use strict';

//node modules
const http = require('http');
//npm modules
//app modules
const Book = require('./model/book.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
//module constants
const PORT = process.env.PORT || 3000;
const router = new Router();
//module logic

//should return an already existing recipe
router.get('/api/book', function(req, res){
  if(req.url.query.id){
    storage.fetchItem('book', req.url.query.id)
    .then(book => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify(book));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.writ('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
  // storage.fetchItem()
});

//should create a recipe on the storage
router.post('/api/book', function(req, res){
  try {
    var book = new Book(req.body.title, req.body.author, req.body.description);
    storage.createItem('book', book);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(book));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
  }
});

//should delete an already existing recipe
router.delete('/api/book', function(req, res){
  if(req.url.query.id){
    storage.deleteItem('recipe', req.url.query.id)
    .then(() => {
      res.writeHead(204);
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up ::', PORT);
});
