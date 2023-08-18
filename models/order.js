const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
  // 'this' keyword is bound to the lineItem document
  return this.qty * this.item.price;
});

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lineItems: [lineItemSchema],
  isPaid: { type: Boolean, default: false } 
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('orderQty').get(function() {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
  return this.findOneAndUpdate(
    // query object
    { user: userId, isPaid: false },
    // update doc - provides values when inserting
    { user: userId },
    // upsert option
    { upsert: true, new: true }
  );
};

// Instance method for adding an item to a cart (unpaid order)
orderSchema.methods.addItemToCart = async function (itemId) {
  // 'this' keyword is bound to the cart (order doc)
  const cart = this;
  // Check if the item already exists in the cart
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    // It already exists, so increase the qty
    lineItem.qty += 1;
  } else {
    // Get the item from the "catalog"
    // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
    const Item = mongoose.model('Item');
    const item = await Item.findById(itemId);
    // The qty of the new lineItem object being pushed in defaults to 1
    cart.lineItems.push({ item });
  }
  // return the save() method's promise
  return cart.save();
};

// Instance method to set an item's qty in the cart
orderSchema.methods.setItemQty = function(itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling deleteOne, removes the lineItem subdoc from the cart.lineItems array
    lineItem.deleteOne();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);
