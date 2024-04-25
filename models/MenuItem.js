const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["Sweet", "Sour", "Spicy"],
    required: true,
  },
  isdrink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: String,
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuSchema);
module.exports = MenuItem;
