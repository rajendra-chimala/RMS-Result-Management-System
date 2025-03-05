require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DatabaseConnection = require('./Database/DB_connection');

const app = express();
DatabaseConnection();

app.use(cors());
app.use(express.json());
app.use('/rms-gmc/',require('./Router/StudentRoute'));

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ! [${process.env.PORT}]`);
})







