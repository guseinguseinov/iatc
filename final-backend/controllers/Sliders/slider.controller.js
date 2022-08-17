import SliderModel from "../../models/Slider.js";
import generateResponseMessage from "../../utils/resGenerate.js";
import fs from 'fs';

const deleteSlidersImage = async sliderId => {
    const slider = await SliderModel.findById(sliderId);
    const { image } = slider;
    fs.unlinkSync(image);
}

const slidersCtrl = {
    async getAllSliders(req, res) {
        const sliders = await SliderModel.find();
        if (sliders.length == 0) {
            return res.status(404).json( generateResponseMessage(404, 'There is no sliders', null));
        }

        res.status(200).json( generateResponseMessage(200, null, sliders));
    },
    async getSingleSlider(req, res) {
        const slider = await SliderModel.findById(req.params.id);
        if (slider.length == 0) {
            return res.status(404).json( generateResponseMessage(404, 'Slider not found', null));
        }
        res.status(200).json( generateResponseMessage(200, null, slider));
    },
    async createSlider(req, res) {
        const { title, description, url } = req.body;
        const { path } = req.file;

        if (!path || !title || !description || !url) {
            return res.json( generateResponseMessage(null, 'Please fill in all required inputs', null ));
        }

        const newSlider = await SliderModel({
            title, 
            description, 
            image: path,
            url,
        });

        await newSlider.save();
        res.status(201).json( generateResponseMessage(201, 'New slider created', null));
    },
    async updateSlider(req, res) {

        if (req.file) {
            await deleteSlidersImage(req.params.id);
            await SliderModel.findByIdAndUpdate(req.params.id, {
                image: req.file.path,
                ...req.body,
            });

        }
        else if (Object.keys(req.body).length == 0){
            return res.status(404).json( generateResponseMessage(404, 'Nothing to update', null));
        }

        await SliderModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json( generateResponseMessage(200, 'Slider info updated', null) );        
    },
    async deleteSlider(req, res) {
        const slider = await SliderModel.findById(req.params.id);
        if (!slider) {
            return res.status(404).json( generateResponseMessage(404, 'Slider not found', null));
        }

        await deleteSlidersImage(req.params.id);
        await SliderModel.findByIdAndDelete(req.params.id);

        res.status(204).json( generateResponseMessage(204, 'Slider deleted successfully', null));
    }
}

export default slidersCtrl;