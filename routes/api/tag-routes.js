const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/',  async(req, res) => {
  console.log('get / ');
  const tags =  await Tag.findAll();
  res.status(200).json(tags);

});

router.get('/:id', async (req, res) => {
  console.log('get/ID');
  try{
    const tagData = await Tag.findByPk(req.params.id);
    if(!tagData){
      res.status(404).json({ message: 'no product with id:'+req.params.id})
    }
    res.status(200).json(tagData);

  }catch (err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  console.log('post id');
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) =>{
    res.json(newTag);
  })
  .catch((err) =>{
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  console.log('put id');
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name:req.body.tag_name,
    },
    {
    where:{
      id:req.params.id,
    }
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBook) => {
      res.json(deletedBook);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
