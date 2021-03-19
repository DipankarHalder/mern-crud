const router = require('express').Router();
const Item = require('../models/items');

router
    .route('/')
    .get(async (req, res) => {
        try {
            const results = await Item
                .find()
                .sort({ date: -1 });
            res
                .status(200)
                .json({ data: results });
        } catch (err) {
            res
                .status(500)
                .json({ msg: "Unable to show the items" });
        }
    })
    .post(async (req, res) => {
        const { 
            title, 
            body, 
            author, 
            email, 
            phone, 
            website 
        } = req.body;

        const createdItem = new Item({ 
            title, 
            body, 
            author, 
            email, 
            phone, 
            website 
        });

        try {
            const existsTitle = await Item
                .find({ title })
                .count();
            if (existsTitle > 0) {
                res
                    .status(200)
                    .json({ msg: "Title already exists" });
            } else {
                const createdData = await createdItem.save();
                res
                    .status(200)
                    .json({ data: createdData, msg: "Successfully created" });
            }
        } catch (err) {
            res.status(500).json({ msg: "Unable to create item" });
        }
    });

router
    .route('/:itemId')
    .get(async (req, res) => {
        try {
            const existsItem = await Item
                .findOne({ _id: req.params.itemId });
            res
                .status(200)
                .json({ data: existsItem });
        } catch (err) {
            res
                .status(500)
                .json({ msg: "Item not found" });
        }
    })
    .put(async (req, res) => {
        try {
            const existsItem = await Item
                .findByIdAndUpdate(
                    { _id: req.params.itemId }, 
                    req.body, 
                    { new: true, runValidator: true }
                );
            res
                .status(200)
                .json({ data: existsItem, msg: "Successfully updated" });
        } catch (err) {
            res
                .status(500)
                .json({ msg: "Unable to updated item" });
        }
    })
    .delete(async (req, res) => {
        try {
            const existsItem = await Item
                .find({ _id: req.params.itemId });
            if (existsItem.length === 1) {
                await Item
                    .remove({ _id: req.params.itemId });
                res
                    .status(200)
                    .json({ msg: "Successfully deleted" });
            } else {
                res
                    .status(200)
                    .json({ msg: "Item not exists" });
            }
        } catch (error) {
            res
                .status(500)
                .json({ msg: "Unable to delete item" });
        }
    });

module.exports = router;