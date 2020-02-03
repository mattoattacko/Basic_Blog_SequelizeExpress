'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {
    publishedAt() {
      const date = moment(this.createdAt).format('MMMM D, YYYY, h:mma');
      return date;
    }
  }
  Article.init({
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    body: Sequelize.TEXT
  },  { sequelize });

  return Article;
};