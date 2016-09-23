'use strict';

const uuid = require('node-uuid');

module.exports = function(headline, article){
  if (!headline) throw new Error('headline expected');
  if (!article) throw new Error('article expected');
  this.id = uuid.v1();
  this.headline = headline;
  this.article = article;
};
