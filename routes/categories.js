var express = require('express');
var router = express.Router();

let { dataCategories, dataProducts } = require('../utils/data');
let slugify = require('slugify');
let { GenID } = require('../utils/idHandler');

// =====================
// GET ALL CATEGORIES
// localhost:3000/api/v1/categories
// =====================
router.get('/', function (req, res, next) {

  let result = dataCategories.filter(function (e) {
    return !e.isDeleted;
  });

  res.send(result);

});


// =====================
// GET CATEGORY BY ID
// localhost:3000/api/v1/categories/1
// =====================
router.get('/:id', function (req, res, next) {

  let id = req.params.id;

  let result = dataCategories.filter(function (e) {
    return e.id == id && !e.isDeleted;
  });

  if (result.length == 0) {
    res.status(404).send({
      message: "ID NOT FOUND"
    });
  }
  else {
    res.send(result[0]);
  }

});


// =====================
// GET PRODUCTS BY CATEGORY
// localhost:3000/api/v1/categories/1/products
// =====================
router.get('/:id/products', function (req, res, next) {

  let id = req.params.id;

  let resultCategory = dataCategories.filter(function (e) {
    return e.id == id && !e.isDeleted;
  });

  if (resultCategory.length == 0) {

    res.status(404).send({
      message: "ID NOT FOUND"
    });

  }
  else {

    let result = dataProducts.filter(function (e) {
      return e.category.id == id;
    });

    res.send(result);

  }

});


// =====================
// CREATE CATEGORY
// POST /api/v1/categories
// =====================
router.post('/', function (req, res, next) {

  let newCate = {

    id: GenID(dataCategories),

    name: req.body.name,

    slug: slugify(req.body.name, {
      replacement: '-',
      lower: true,
      trim: true
    }),

    image: req.body.image,

    isDeleted: false,

    creationAt: new Date(),

    updatedAt: new Date()

  };

  dataCategories.push(newCate);

  res.send(newCate);

});


// =====================
// UPDATE CATEGORY
// PUT /api/v1/categories/:id
// =====================
router.put('/:id', function (req, res, next) {

  let id = req.params.id;

  let result = dataCategories.filter(function (e) {
    return e.id == id && !e.isDeleted;
  });

  if (result.length == 0) {

    res.status(404).send({
      message: "ID NOT FOUND"
    });

  }
  else {

    result = result[0];

    let keys = Object.keys(req.body);

    for (const key of keys) {

      if (key in result) {
        result[key] = req.body[key];
      }

    }

    result.updatedAt = new Date();

    res.send(result);

  }

});


// =====================
// DELETE CATEGORY
// DELETE /api/v1/categories/:id
// =====================
router.delete('/:id', function (req, res, next) {

  let id = req.params.id;

  let result = dataCategories.filter(function (e) {
    return e.id == id && !e.isDeleted;
  });

  if (result.length == 0) {

    res.status(404).send({
      message: "ID NOT FOUND"
    });

  }
  else {

    result = result[0];

    result.isDeleted = true;

    result.updatedAt = new Date();

    res.send(result);

  }

});


module.exports = router;