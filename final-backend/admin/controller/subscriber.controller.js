import SubscriberModel from "../../models/Subscriber.js";
import generateResponseMessage from "../../utils/resGenerate.js";
import fs from "fs";
import path from 'path';


const subscriberCtrl={
    async getAllSubscribers(req,res){
        const subscribers=await SubscriberModel.find();
        if(!subscribers){
            return res.status(404).json(generateResponseMessage(404, 'There is no subscriber', null));
        }
        res.status(200).json(generateResponseMessage(200, null, subscribers));
    },
    async getSingleSubscriber(req,res){
        const subscriber = await SubscriberModel.findById(req.params.id);
        if (!subscriber) return res.status(404).json(generateResponseMessage(404, 'Subscriber not found', null));
        res.status(200).json(generateResponseMessage(200, null, subscriber));
    },
    async createSubscriber(req, res) {
        const { subscribers } = req.body;
        if (req.file) {
            var { path } = req.file;
        }
        const newSubscriber = new SubscriberModel({
            ...req.body
        });
        await newSubscriber.save();
        res.status(201).json(generateResponseMessage(201, 'New subscribe!', null));
    },
    async updateSubscriber(req, res) {
        if (req.file) {
            await SubscriberModel.findByIdAndUpdate(req.params.id, {
                ...req.body,
            });
            return res.status(200).json(generateResponseMessage(200, 'Subscriber updated', null));
        }
        else if (Object.keys(req.body).length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'Nothing to update', null));
        }
        await SubscriberModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(generateResponseMessage(200, 'Subscriber updated', null));
    },
    async deleteSubscriber(req, res) {
        const subscriber = await SubscriberModel.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json(generateResponseMessage(404, 'Subscriber not found', null));
        }
        await SubscriberModel.findByIdAndDelete(req.params.id);
        res.status(200).json(generateResponseMessage(200, 'Subscriber deleted successfully', null));
    }
}
export default subscriberCtrl;