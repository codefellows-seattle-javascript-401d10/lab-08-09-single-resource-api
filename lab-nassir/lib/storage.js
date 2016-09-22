'use strict';

// const storage = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('We expected a schemaName...'));
  if(!item) return Promise.reject(new Error('We expected an item...'));
  //
  // if(!storage[schemaName]) storage[schemaName] = {};
  // storage[schemaName][item.id] = item;
  // return Promise.resolve(item);
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  // return new Promise((resolve, reject) => {
  //   if (!schemaName) return reject(new Error('We expected a schemaName in fetch...'));
  //   if(!id) return reject(new Error('We expected an id...'));
  //
  //   var schema = storage[schemaName];
  //   if(!schema) return reject(new Error('The schema has not been found in fetch...'));
  //   var item = schema[id];
  //   if(!item) return reject(new Error('Sad to report, we have not found an item to fetch...'));
  //   resolve(item);
  // });
  if(!schemaName) return Promise.reject(new Error('We expected a schemaName...'));
  if(!id) return Promise.reject(new Error('We expected an id...'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(err));
};

// exports.deleteItem = function(schemaName, id) {
  // return new Promise((resolve, reject) => {
  //   if (!schemaName) return reject(new Error('We expected a schemaName in delete...'));
  //   if(!id) return reject(new Error('We expected an id...'));
  //
  //   var schema = storage[schemaName];
  //   if(!schema) return reject(new Error('The schema has not been found in delete...'));
  //   var item = schema[id];
  //   if(!item) return reject(new Error('Sad to report, we have not found an item to delete...'));
  //   delete schema[id];
  //   resolve();
  // });

// };
