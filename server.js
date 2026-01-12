const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const router = require('./Routes/Route');

connectDB();

const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/', router)

app.listen(process.env.PORT, (error) => {
    error ? console.log('Server Connection Failed') : console.log(`Server is running on port ${process.env.PORT}`);
})