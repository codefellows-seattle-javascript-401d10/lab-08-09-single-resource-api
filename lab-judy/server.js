'use strict';

//node modules
const http = require('http');

//npm modules
//app modules
const Person = require('./model/person.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

//module constants
const PORT = process.env.PORT || 3000;
const router = new Router();

//module logic
router.get('/api/person', function(req, res){
  if (req.url.query.id) {
    storage.fetchItem('person', req.url.query.id)
    .then(person => {
      res.writeHead(200, {
        'Content-Type': 'application.json',
      });
      res.write(JSON.stringify(person));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
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

router.post('/api/person', function(req, res){
  try{
    var person = new Person(req.body.name, req.body.age);
    storage.createItem('person', person);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(person));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {'Content-Type:': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

//TODO: Write delete method? Not working....
router.delete('/api/person', function(req, res){
  if (req.url.query.id){
    storage.deleteItem('person', req.url.query.id)
    .then(() => {
      res.writeHead(204,{'Content-Type': 'text/plain'});
      res.write('selected person deleted successfully');
      res.end();
    })
    .catch ( err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
  }
});


const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('server up: ', PORT);
});
