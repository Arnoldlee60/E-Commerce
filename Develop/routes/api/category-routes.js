const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    //include
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((CategoryData) => res.json(CategoryData)).catch((err) => {
      console.log(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    //here
    where: {
      id: req.params.id, 
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((CategoryData) => 
    {
      //console.log(req)
      //console.log(req.params)
      //console.log(req.params.id)
      res.json(CategoryData);
    })
    .catch((err) => 
    {
      console.log(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
    /*
    products: [
      {
      "id": req.body.id,
      "product_name": req.body.product_name,
      "price": req.body.price,
      "stock": req.body.stock,
      "category_id": req.body,
      }
  ]
  */
  })
    .then((CategoryData) => res.json(CategoryData)).catch((err) => 
    {
      console.log(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: 
      {
        id: req.params.id,
      },
    }
  )
    .then((CategoryData) => 
    {
      res.json(CategoryData);
    })
    .catch((err) => 
    {
      console.log(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(CategoryData => {
      res.json(CategoryData);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
