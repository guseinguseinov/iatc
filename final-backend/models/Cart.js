import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    userId: {
        type: "ObjectId",
        ref: "users",
    },
    events: [{
        event: {
            type: 'ObjectId',
            ref: "events"
        },
        quantity: Number,
    }],
});

const CartModel = mongoose.model('carts', CartSchema);

export default CartModel;