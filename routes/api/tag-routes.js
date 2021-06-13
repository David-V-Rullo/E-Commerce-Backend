const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
    // find all tags
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']}
    })
    res.status(200).json(tagData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', (req, res) => {
  try {
    const singleTag = await Product.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['category_id', 'product_name', 'price', 'stock'],     
    })

    if (!singleTag) {
      res.status(404).json({ message: 'No product found with that Tag!' });
      return;
    }

    res.status(200).json(singleId);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find a single tag by its `id`
router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Product.create({
      tag_name : req.body.tag_name      
    })
    res.status(200).json(newProduct)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagUpdate) 
    res.json(dbTagUpdate)
  .catch(err)
    res.status(500).json(err)
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  
    // delete one product by its `id` value
    try {
      const deadTag = await Product.destroy({
        where: { id: req.params.id }
      })
      if (!deadTag) {
        res.status(404).json({message: 'No product found with this id'})
      }
      res.status(200).json(deadTag)
    }
    catch (err) {
      res.status(400).json(err)
    }
  });
  // delete on tag by its `id` value
  
module.exports = router;
