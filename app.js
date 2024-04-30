const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogify');

const blogPostRoutes = require('./routes/blogPostRoutes');
app.use('/api/blogposts', blogPostRoutes);


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})