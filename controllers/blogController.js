const BlogPost = require('../models/BlogPost')

const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find();
        if (blogs.length === 0) {
            res.status(404).json({ message: 'No blogs found' })
        }
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
    }
}
const create = async (req, res) => {
    try {
        const data = req.body;
        const newBlog = new BlogPost(data);
        await newBlog.save();
        res.status(201).json(newBlog)
    } catch (error) {
        console.log(error)
    }
}

const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await BlogPost.findById(id);

        res.status(200).json(blog)
    } catch (error) {
        console.log(error)
    }
}

const updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const blog = await BlogPost.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(blog)
    }
    catch (error) {
        console.log(error)
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        await BlogPost.findByIdAndDelete(id);
        res.status(204).json({ message: 'Blog deleted successfully' })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBlogs,
    create,
    getBlogById,
    updateBlog,
    deleteBlog
}