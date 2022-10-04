import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
    subscribers: [{
       userEmail:{
        type:String
       } 
    }]
}, { timestamps: true, })


const SubscriberModel = mongoose.model('subscribers', SubscriberSchema);
export default SubscriberModel;