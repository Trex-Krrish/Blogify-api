require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

const blogPostRoutes = require('./routes/blogPostRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/blogposts', blogPostRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})