import CategoryModel from "../../models/category.js";
import generateResponseMessage from "../../utils/resGenerate.js";


const categoryCtrl={
    async getAllCategories(req,res){
        const categories=await CategoryModel.find();
        if(!categories){
            return res.status(404).json(generateResponseMessage(404, 'There is no category', null));
        }
        res.status(200).json(generateResponseMessage(200, null, categories));
    },
    async getSingleCategory(req,res){
        const category = await CategoryModel.findById(req.params.id);
        if (!category) return res.status(404).json(generateResponseMessage(404, 'Category not found', null));
        res.status(200).json(generateResponseMessage(200, null, category));
    },
    async createCategory(req, res) {
        const { name } = req.body;
        if (req.file) {
            var { path } = req.file;
        }
        let categoryImage = 'http://localhost:8080/'+ path;
        const newCategory = new CategoryModel({
            categoryImage:categoryImage,
            ...req.body
        });
        await newCategory.save();
        res.status(201).json(generateResponseMessage(201, 'New category created', null));
    },
    async updateCategory(req, res) {
        if (req.file) {
            await CategoryModel.findByIdAndUpdate(req.params.id, {
                ...req.body,
            });
            return res.status(200).json(generateResponseMessage(200, 'Category updated', null));
        }
        else if (Object.keys(req.body).length == 0) {
            return res.status(404).json(generateResponseMessage(404, 'Nothing to update', null));
        }
        await CategoryModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(generateResponseMessage(200, 'Category updated', null));
    },
    async deleteCategory(req, res) {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json(generateResponseMessage(404, 'Category not found', null));
        }
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json(generateResponseMessage(200, 'Category deleted successfully', null));
    }
}
export default categoryCtrl;