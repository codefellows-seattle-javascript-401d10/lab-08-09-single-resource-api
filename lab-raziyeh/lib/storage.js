'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'),{suffix:'Prom'});
const del = require('del');
const mkdirp = Promise.promisifyAll(require('mkdirp-bluebird'),{suffix:'Prom'});

//const storage = {};
module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!item) return Promise.reject(new Error('expected item'));
  
  return mkdirp(`${__dirname}/../data/${schemaName}`)
  .then(() => console.log('Done'))
  .then(() => fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`,JSON.stringify(item)))
  .then(item => item)
  .catch( err => Promise.reject('error',err));
};

exports.fetchItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        let item = JSON.parse(data);
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch(err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id){
  if(!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject(new Error('expected id'));

  return del(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( path => {
      path.join('\n');
      console.log('the file named ' , path ,'deleted');
    })
    .catch( err => Promise.reject(err));
};
