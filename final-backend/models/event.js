import mongoose from "mongoose";

const checkEndTime = async today => {
    today = new Date();
    today.setDate(today.getDate() + 30);
    console.log(today.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 19));
}

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title required'],
    },
    price: {
        type: Number,
        required: [true, 'Event price required'],
    },
    location: {
        type: String,
        required: [true, 'Location required'],
    },
    startTime: {
        type: Date,
        default: Date.now(),//yyyy-mm-dd
        required: [true, 'Start time required'],
    },
    endTime: {
        type: Date,
        required: [true, 'End time required'],
        validate: {
            validator: checkEndTime,
            message: props => `Last time is ${props.value}`
        }
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    image: {
        type: String,
        required: [true, 'Event image required'],
        //upload
    },
    address: {
        country: {
            type: String,
            required: [true, 'Country required'],
        },
        city: {
            type: String,
            required: [true, 'City required'],
        },
    },
    website: {
        type: String,
        required: [true, 'Website required'],
    },
    comment: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
        required: [true, 'Comment required'],
         
    }
}, { timestamps: true, })


const EventModel = mongoose.model('events', EventSchema);
export default EventModel;
