//item.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String },
    content: { type: String },
    status: { type: String },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
