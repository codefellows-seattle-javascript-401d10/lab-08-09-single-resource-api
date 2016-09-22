'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  // do error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  // do error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString()); return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id){

  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => {
    console.log('recipe successfully deleted');
  })
  .catch(err => {
    Promise.reject(err);
  });

    // var schema = storage[schemaName];
    // if (!schema) return reject(new Error('schema not found'));
    // var item = schema[id];
    // if (!item) return reject(new Error('item doesnt exist, cant be deleted'));
    // //if the item exists, delete it from the storage object
    // delete schema[id];
    // resolve();
};
