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

router.delete('/api/book', function(req, res){
  if(req.url.query.id){
    storage.fetchItem('book', req.url.query.id)
    .then(book => {
      res.writeHead(204, {
        'Content-Type': 'application/json',
      });
      res.end();
      var title = book.title;
      storage.deleteItem('book', req.url.query.id)
      .then(() => {
        res.write(`${title} deleted`);
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.write('not found');
        res.end();
      });
    });
    return;
  }
});

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
});

router.post('/api/book', function(req, res){
  try {
    var book = new Book(req.body.title, req.body.author, req.body.description);
    storage.createItem('book', book);
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
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

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up ::', PORT);
});
