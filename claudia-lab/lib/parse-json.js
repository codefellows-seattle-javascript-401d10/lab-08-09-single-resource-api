'use strict';

module.exports = function(req) { //only http methods that have a body are POST and PUT
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT'){
      var body = '';
      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () =>{
        try {
          req.body = JSON.parse(body);
          resolve(req); //if this works
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      //request error, timeout error, TCP error
      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return;
    } //don't need ; after this

    resolve(); //does this on a GET or DELETE (anything bt POST or PUT)

  }); //need () if there are 2 parameters
};
