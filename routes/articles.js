const express = require('express');
const router = express.Router();
const Article = require('../models').Article; // We want to import the Article model and all the ORM methods to use, accessed with ".Article"

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}

/* GET articles listing. */
//
// This route gets all articles 
router.get('/', asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    order: [["createdAt", "DESC"]]
  });
  res.render("articles/index", { articles, title: "Sequelize-It!" });
}));

/* Create a new article form. */

// Runs when you click "create new article" button.
router.get('/new', (req, res) => {
  res.render("articles/new", { article: {}, title: "New Article" });
});

/* POST create article. */
//
// Route responsible for creating and posting a new article. 
// the req body property returns an object containing the key value pairs of data submitted in the request body. So the 'form' data. 
router.post('/', asyncHandler(async (req, res) => {
  const article = await Article.create(req.body);
  res.redirect("/articles/" + article.id);
}));

/* Edit article form. */
//
//
router.get("/:id/edit", asyncHandler(async(req, res) => {
  res.render("articles/edit", { article: {}, title: "Edit Article" });
}));

/* GET individual article. */
//
// This GET route renders the articles/show view, and displays an article based on an 'id' parameter in the URL path.
router.get("/:id", asyncHandler(async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  res.render("articles/show", { article, title: article.title }); 
}));

/* Update an article. */
//
router.post('/:id/edit', asyncHandler(async (req, res) => {
  res.redirect("/articles/");
}));

/* Delete article form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  res.render("articles/delete", { article: {}, title: "Delete Article" });
}));

/* Delete individual article. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  res.redirect("/articles");
}));

module.exports = router;