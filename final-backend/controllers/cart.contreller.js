import CartModel from "../models/Cart.js";
import UserModel from "../models/User.js";
import generateResponseMessage from "../utils/resGenerate.js";


const CartCtrl = {
    async addToCart(req, res) {
        const { userId } = req.query;
        const { eventId, quantity = 1 } = req.body;

        const eventObj = {
            event: eventId,
            quantity,
        }
        try {
            const cart = await CartModel.findOneAndUpdate({ userId }, {
                $push: { events: eventObj },
            }, {
                upsert: true,
            });

            const user = await UserModel.findByIdAndUpdate(userId, {
                cart: cart._id,
            }, { upsert: true });
        }
        catch (error) {
            return res.status(404).json(generateResponseMessage(404, 'Shit happens !', null));
        }

        res.status(201).json(generateResponseMessage(201, "Event added to cart successfully", null));
    },
    async removeFromCart(req, res) {
        const { userId } = req.query;
        const { eventId } = req.body;

        const eventObj = {
            event: eventId,
        }

        try {
            const cart = await CartModel.findOneAndUpdate({ userId }, {
                $pull: { events: eventObj }
            });
        }
        catch (error) {
            console.log(error);
            res.send("shit happens");
        }
        res.send('ok');
    }
}

export default CartCtrl;