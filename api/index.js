const express = require('express');
require('dotenv').config();
const cors = require("cors");

const dbConnect = require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());
dbConnect();

const PORT = process.env.PORT || 8080;

const FileUpload = require('./controllers/FileUpload');
const AuthRoutes = require('./routes/Auth');

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/file", FileUpload);

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})