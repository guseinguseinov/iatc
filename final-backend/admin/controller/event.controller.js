import EventModel from "../../models/Event.js";
import CategoryModel from "../../models/category.js";
import generateResponseMessage from "../../utils/resGenerate.js";
import fs from "fs";
import path from 'path';

const deleteEventImage = async eventId => {
    const event = await EventModel.findById(eventId);
    const { eventImage } = event;
    const filePath = path.resolve(eventImage);

    try {
        fs.unlinkSync(eventImage);
    }
    catch (err) {
        console.log("Didnt find the path");
    }
}

const eventCtrl = {
    async getAllEvents(req, res) {
        let filter={};
        
        if(req.query.categories){
            filter={category:req.query.categories.split(',')};
        }
        const events = await EventModel.find(filter).populate('category').exec();
        if (events.length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'There is no event', null));
        }
        res.status(200).json(generateResponseMessage(200, null, events));
    },
    async getSingleEvent(req, res) {
        const event = await EventModel.findById(req.params.id).populate('category').exec();

        if (!event) return res.status(404).json(generateResponseMessage(404, 'Event not found', null));

        res.status(200).json(generateResponseMessage(200, null, event));
    },
    async createEvent(req, res) {
        const { title, price, location, startTime, endTime, description, address, category,website, comment } = req.body;
        if (req.file) {
            var { path } = req.file;
        }

        let eventImage = 'http://localhost:8080/'+ path;
        const newEvent = new EventModel({
            eventImage: eventImage,
            ...req.body
        });
        await newEvent.save();
        res.status(201).json(generateResponseMessage(201, 'New event created', null));
    },
    async updateEvent(req, res) {
        if (req.file) {
            await deleteEventImage(req.params.id);
            await EventModel.findByIdAndUpdate(req.params.id, {
                eventImage: req.file.path,
                ...req.body,
            });
            return res.status(200).json(generateResponseMessage(200, 'Event info updated', null));
        }
        else if (Object.keys(req.body).length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'Nothing to update', null));
        }
        await EventModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(generateResponseMessage(200, 'Event info updated', null));
    },
    async deleteEvent(req, res) {
        const event = await EventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json(generateResponseMessage(404, 'Event not found', null));
        }
        await deleteEventImage(req.params.id);
        await EventModel.findByIdAndDelete(req.params.id);
        res.status(200).json(generateResponseMessage(200, 'Event deleted successfully', null));
    }
}
export default eventCtrl;