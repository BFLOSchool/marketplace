var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarketplaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  ingredients: {
    type: Array,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  }
}); 

module.exports = mongoose.model('Marketplace', MarketplaceSchema);
