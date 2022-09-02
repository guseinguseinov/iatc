import EventModel from "../../models/event.js";
import generateResponseMessage from "../../utils/resGenerate.js";
import fs from "fs";

const deleteEventImage=async eventId=>{
    const event=await EventModel.findById(eventId);
    const{image}=event;
    fs.unlinkSync(image);
}

const eventCtrl = {
    async getAllEvents(req, res) {
        const events = await EventModel.find();
        if (events.length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'There is no event', null));
        }
        res.status(200).json(generateResponseMessage(200, null, events));
    },

    async getSingleEvent(req, res) {
        const event = await EventModel.findById(req.params.id);
        if (event.length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'Event not found', null));
        }
        res.status(200).json(generateResponseMessage(200, null, event));
    },
    async createEvent(req, res) {
        const { title, price, location, startTime, endTime, description, address, website, comment } = req.body;
        if (req.file) {
            var { path } = req.file;
        }
        const newEvent = await EventModel({
            title,
            price, 
            location,
            startTime,
            endTime,
            description,
            image: path,
            address,
            website,
            comment,
        });
        await newEvent.save();
        res.status(201).json(generateResponseMessage(201,'New event created',null));
    },

    async updateEvent(req,res){
        if(req.file){
            await deleteEventImage(req.params.id);
            await EventModel.findByIdAndUpdate(req.params.id,{
                image:req.file.path,
                ...req.body,
            });
        }
        else if(Object.keys(req.body),length==0){
            return res.status(404).json(generateResponseMessage(404, 'Nothing to update', null));
        }
        await EventModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(generateResponseMessage(200, 'Event info updated', null));
    },

    async deleteEvent(req,res){
        const event=await EventModel.findById(req.params.id);
        if(!event){
            return res.status(404).json(generateResponseMessage(404, 'Event not found', null));
        }
        await deleteEventImage(req.params.id);
        await EventModel.findByIdAndDelete(req.params.id);
        res.status(200).json(generateResponseMessage(200, 'Event deleted successfully', null));
    }
}
export default eventCtrl;