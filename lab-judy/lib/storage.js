'use strict';

const del = require('del');
const mkdirp = require('mkdirp');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

function createDirectories (folderName, schemaName){
  if (!folderName && !schemaName) return Promise.reject(new Error('expected folderName and schemaName'));
  return mkdirp(`${__dirname}/../data/${schemaName}`, err => {
    if (err) return err;
    console.log('new data directory created');
  });
}


exports.createItem = function(schemaName, item){
  //do error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!item) return Promise.reject(new Error('expected item'));


  let json = JSON.stringify(item);
  if (!createDirectories('data', schemaName));
  createDirectories('data', schemaName);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item )
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch (err => Promise.reject(err));
};

exports.deleteItem = function(schemaName, id){
    //error handling
  if (!schemaName) return Promise.reject(new Error('expected schemaName'));
  if(!id) return Promise.reject (new Error('expected id'));

  return del([`${__dirname}/../data/${schemaName}/${id}.json`])
  .then ( paths => {
    try{
      console.log('file deleted at: \n', paths.join('\n'));
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch (err => Promise.reject(err));

};
