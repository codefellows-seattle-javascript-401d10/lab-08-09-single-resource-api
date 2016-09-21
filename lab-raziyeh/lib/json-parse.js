'use strict';

// we need a request body data for PUT or POST method.
module.exports = function(req) {
  return new Promise((resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT') {
      this.body = {};
      req.on('data', data => {
        //because the request body just accept a string, so we convert the data to string and put it in request body
        this.body += data.toString();
      });
      req.on('end', () => {
        try {
          //convert a data string to JSON format and put it in request body
          req.body = JSON.parse(this.body);
          resolve(req);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
      //for handle error
      req.on('error', (error) => {
        console.error(error);
        reject(error);
      });
      return;
    }
    // for any other methods but POST and PUT, we call resolve to prevent the server from crashing
    resolve();
  });
};