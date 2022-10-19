const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  const categories =  await Category.findAll();
  res.status(200).json(categories);


});

router.get('/:id', async (req, res) => {

  try{
    const categoryData = await Category.findByPk(req.params.id);
    if(!categoryData){
      res.status(404).json({ message: 'no product with id:'+req.params.id})
    }
    res.status(200).json(categoryData);

  }catch (err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {

  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) =>{
    res.json(newCategory);
  })
  .catch((err)=>{
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
        id: req.params.id,
      }
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
