'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  // error handling here
  if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
  if (!item) return Promise.reject(new Error('expected an item'));

  let json = JSON.stringify(item);
  return fs.accessProm(`${__dirname}/../data/${schemaName}`)
  .catch(err => {
    if(err.code === 'ENOENT') {
      return mkdirp.mkdirpProm(`${__dirname}/../data/${schemaName}`);
    }
    return Promise.reject(err);
  })
  .then( () => fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json))
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
  if (!id) return Promise.reject(new Error('expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err) {
      return Promise.reject(err);
    }
  })
  .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id) {
  if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
  if (!id) return Promise.reject(new Error('expected an id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => {
    console.log(schemaName, id, 'has been deleted');
  })
  .catch(err => Promise.reject(err));
};
