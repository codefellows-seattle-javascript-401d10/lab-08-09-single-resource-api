// model is like resources so even though this is a constructor, it is still a helper file
// every time router gets request, runs promises, othewise gets an error
// object that maps callbacks to a url and a method
// looks for /thing in a GET or a POST
// router only runs the right function for the corresponding url and method
// if nothing is found, sends an error---no route is found

//Router makes it easier to write logic - can copy this
//objects - mapping things to other things

'use strict';

const parseURL = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() { //creating an object to store functions with (req,res) that correspond with GET, POST, PUT, DELETE
  this.routes = { //specified by URL and method
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback){ //callback is (req,res) function ran for the route
  this.routes.GET[endpoint] = callback;
  //if the GET request is called and note is passed in, gets put into object
  //endpoint is property of GET object and callback is registered at that endpoint
};

Router.prototype.post = function(endpoint, callback){ // (/api/note, (req,res))
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};
//proto for one route
Router.prototype.route = function(){
  return (req, res) => { //what the create server is expecting
    //pares url/json, finds the correct logic, if it doesnt find the right logic for te correct method, returns 400 error (bad request)
    Promise.all([
      parseURL(req),
      parseJSON(req), //if parse json fails, you get a 400 error (bad request)
    ])
    .then(() => {
      //if there is a callback registered at a specific method and url, use it
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req,res);//returning this returns to the server itself and runs it, invokes the callback (req,res)
        return;
      }//get PUT POST DELETE) at a specific pathname
      console.error('route not found');
      res.writeHead(404, { //if it doesn't work, it just goes to the error
        'Content-Type': 'text/plain',
      });
      res.write('route not found');
      res.end();

    }) //don't need to get stuff form the .then because its already on the request
    .catch ( err => {
      console.error(err); //if parsebody fails, log the error to server and respond 400 to user
      res.writeHead(400, {
        'Content-Type': 'text/plain',
      });
      res.write('bad request');
      res.end();
    });
  };
}; //result of the function = one of these callbacks- the one for the right url
