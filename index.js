const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./src/routes/User');
const folderRoutes = require('./src/routes/Folder');
const formRoutes = require('./src/routes/Form');

const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
dotenv.config();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRoutes);
app.use(folderRoutes);
app.use(formRoutes);

app.use((req, res, next) => {
    const err = Object.assign(Error("Endpoint not found"), { code: 404 });
    next(err);
})

app.use(errorHandler);  

const port = process.env.PORT || 1000 
app.listen(port, () => {
    mongoose.connect(process.env.DB_URL).then(() => app.get('/', (req, res) => {
        res.status(200).send({ status: "success", msg: "API is working well." });
    })).catch((error) => console.log(error))
})
