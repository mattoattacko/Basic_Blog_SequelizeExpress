'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {}
  Article.init({

  },  { sequelize });

  return Article;
};