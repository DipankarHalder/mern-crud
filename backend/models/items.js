const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema(
    {
        title:      { type: String, required: true },
        body:       { type: String },
        author:     { type: String, required: true },
        email:      { type: String, required: true },
        phone:      { type: String },
        website:    { type: String }
    }, { timestamps: true }
);
module.exports = mongoose.model('Item', ItemSchema);