import EventModel from "../../models/Event.js";
import CategoryModel from "../../models/category.js";
import generateResponseMessage from "../../utils/resGenerate.js";
import fs from "fs";
import path from 'path';
import emailSender from '../../utils/emailSender.js'
import nodemailer from 'nodemailer';
import UserModel from '../../models/User.js';
import transport from "../../utils/emailSender.js";
import userCtrl from "../../controllers/user.controller.js"
import SubscriberModel from "../../models/Subscriber.js";

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
        // let filter = {};
        // if (req.query.categories) {
        //     filter = { category: req.query.categories.split(',') };
        // }
        // const events = await EventModel.find(filter).populate('category').exec();
        const events = await EventModel.find();
            const filters = req.query;
            const filteredEvents = events.filter(event => {
              let isValid = true;
              for (let key in filters) {
                console.log(key, event[key], filters[key]);
                isValid = isValid && event[key] == filters[key];
              }
              return isValid;
            });
            res.send(filteredEvents);
            
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
        const { title, price, location, startTime, endTime, description, address, category, website, comment } = req.body;
        if (req.file) {
            var { path } = req.file;
        }

        let eventImage = 'http://localhost:8080/' + path;
        const newEvent = new EventModel({
            eventImage: eventImage,
            ...req.body
        });
        await newEvent.save();

      /*  const users = await UserModel.find({email});
        console.log(users)
        const newSubscriber = new SubscriberModel({userEmail: users._email})
newSubscriber.save()
        const eventsLink = 'http://localhost:8080/admin/events/'+newEvent._id;
        // const { email } = userCtrl.getAllUsers();
        // const userEmail = await UserModel.findOne({ email })
        // if (!userEmail) return res.status(404).json(generateResponseMessage(404, 'User no longer exists', null));
        let usersEmail=[];
        for(let  i in users){
                usersEmail.push(i);
        }
        let sendEventMail = await transport.sendMail({
            from: 'iTicket Api <noreply@iticket.info',
            to: usersEmail,
            subject: 'Event News!',
            text: `New Event added. For more information please click the link below:
            &${eventsLink}
            `,
            html: `
            <h1>Event News!</h1>
            <p>
            New Event added. For more information please click the link below:
            <a href=${eventsLink} target="_blank">Events</a>
            </p>
            `

        })
        res.send({
            message: 'Email has been sent'
        })*/
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