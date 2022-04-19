const express = require('express');
const res = require('express/lib/response');
const app = express();

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');
app.use(express.json());

require('./src/config/dbConfig')();

app.use('/api/v1', require('./src/routes'));


app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to ${port}`);
})
