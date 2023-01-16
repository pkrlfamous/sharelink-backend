const express = require("express")
const router = express.Router();
const res = require('express/lib/response');
const app = express();
require('dotenv').config();

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION');
        process.exit(1);
});

router.all("/", (req, res) => {
    res.send("hi from Main Router");
})

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');
app.use(express.json());

require('./src/config/dbConfig')();

app.use('/api/v1', require('./src/routes'));


app.all('*', (req, res, next)=>{
    res.send("hi from Main Router");
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`listening to ${port}`);
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION');
    server.close(() => {
        process.exit(1);
    });
});