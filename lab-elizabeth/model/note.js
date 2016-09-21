'use strict';

const uuid = require('node-uuid');

module.exports = function(author, article){
  if(!author) throw new Error('author expected');
  if(!article) throw new Error('article expected');
  this.id = uuid.v1();
  this.author = author;
  this.article = article;
};
