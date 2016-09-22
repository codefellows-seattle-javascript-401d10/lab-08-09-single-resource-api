'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
  if (!item) return Promise.reject(new Error('expected an item'));

  if (!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
    if (!id) return Promise.reject(new Error('expected an id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    resolve(item);
  });
};

exports.deleteItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return Promise.reject(new Error('expected a schemaName'));
    if (!id) return Promise.reject(new Error('expected an id'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('schema not found'));
    var item = schema[id];
    if(!item) return reject(new Error('item not found'));
    delete schema[id];
    resolve('Item has been deleted.');
  });
};
