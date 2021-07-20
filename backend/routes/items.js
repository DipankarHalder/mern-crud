const router = require('express').Router();
const Item = require('../models/items');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const results = await Item.find().sort({ 
        date: -1 
      });
      res.status(200).json({
        data: results
      });
    } catch (err) {
      res.status(500).json({ 
        msg: "Unable to show the list" 
      });
    }
  })
  .post(async (req, res) => {
    const { name, email, phone } = req.body;
    const findPhone = await Item.findOne({ phone });
    const findEmail = await Item.findOne({ email });

    if (findPhone) {
      return res.status(200).json({ 
        msg: "Phone no already exists" 
      });
    }
    if (findEmail) {
      return res.status(200).json({ 
        msg: "Email already exists" 
      });
    }

    const createdItem = new Item({ name, email, phone });
    try {
      res.status(200).json({ 
        data: await createdItem.save(), 
        msg: "User successfully created" 
      });
    } catch (err) {
      res.status(500).json({ 
        msg: "User unable to create item" 
      });
    }
  });

router
  .route('/:itemId')
  .get(async (req, res) => {
    try {
      const existsItem = await Item.findOne({ 
        _id: req.params.itemId 
      });
      res.status(200).json({ 
        data: existsItem 
      });
    } catch (err) {
      res.status(500).json({ 
        msg: "User not found" 
      });
    }
  })
  .put(async (req, res) => {
    try {
      const existsItem = await Item.findByIdAndUpdate(
        { _id: req.params.itemId }, req.body, 
        { new: true, runValidator: true }
      );
      res.status(200).json({ 
        data: existsItem, 
        msg: "User successfully updated" 
      });
    } catch (err) {
      res.status(500).json({ 
        msg: "User unable to updated item" 
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const existsItem = await Item.find({ 
        _id: req.params.itemId 
      });
      if (existsItem.length === 1) {
        await Item.remove({ 
          _id: req.params.itemId 
        });
        res.status(200).json({ 
          msg: "User successfully deleted" 
        });
      } else {
        res.status(200).json({ 
          msg: "User does not exists" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        msg: "User unable to delete item" 
      });
    }
  });

module.exports = router;