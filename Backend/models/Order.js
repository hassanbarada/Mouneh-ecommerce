const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String},
    paymentIntentId: { type: String},
    productID: [{ type: String }],
    quantity: [{ type: Number }],
    /*CartInfo: [
        {
          cartID: { type: String },
          userID: { type: String },
          productID: [{
            _id: { type: String },
            /*name: { type: String },
            image: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            description: { type: String },
            weight: { type: Number }, 
            category: { type: String},
            subcategory: { type:String},
            recipes: {
              ingredient: { type: String },
              time: { type: Number },
              method: { type: String },
            },
          }],
          quantity: { type: Number },
        },
      ],*/
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;