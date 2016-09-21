'use strict';

const storage = {};

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('We expected a schemaName...'));
  if(!item) return Promise.reject(new Error('We expected an item...'));

  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schemaName, id) {
  return new Promise((resolve, reject) => {
    if (!schemaName) return reject(new Error('We expected a schemaName...'));
    if(!id) return reject(new Error('We expected an id...'));

    var schema = storage[schemaName];
    if(!schema) return reject(new Error('The schema has not been found...'));
    var item = schema[id];
    if(!item) return reject(new Error('Sad to report, we have not'));
    resolve(item);
  });
};
