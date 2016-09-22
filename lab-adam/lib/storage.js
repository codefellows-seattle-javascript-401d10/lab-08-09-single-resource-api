'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const mkdirp = Promise.promisifyAll(require('mkdirp'));

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));
  let json = JSON.stringify(item);
  let path = `${__dirname}/../data/${schemaName}`;
  fs.accessProm(path)
  .catch(err => {
    if (err.code === 'ENOENT') {
      return mkdirp.mkdirpAsync(path);
    }
  })
  .then(() => fs.writeFileProm(`${path}/${item.id}.json`, json))
  .then(() => item)
  .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected item'));
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch(err =>Promise.reject(err));
};

exports.deleteItem = function(schemaName, id){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected item'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(err));
};

exports.availIDs = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`);
};
