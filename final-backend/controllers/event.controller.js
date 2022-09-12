import EventModel from "../models/Event.js";
import generateResponseMessage from "../utils/resGenerate.js";

const eventCtrl = {
    async getAllEvents(req, res) {
        const events = await EventModel.find()
            .populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
            .exec();;
        if (events.length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'There is no event', null));
        }
        res.status(200).json(generateResponseMessage(200, null, events));
    },
    async getSingleEvent(req, res) {
        const event = await EventModel.findById(req.params.id)
            .populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
            .exec();;

        if (!event) return res.status(404).json(generateResponseMessage(404, 'Event not found', null));

        res.status(200).json(generateResponseMessage(200, null, event));
    },
}

export default eventCtrl;