import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
    },
    event: [{
        type: String // add events
    }]
});

const WishlistModel = mongoose.model('wishlists', WishlistSchema);

export default WishlistModel;