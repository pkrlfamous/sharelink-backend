const express = require('express');
const res = require('express/lib/response');
const app = express();

app.use(express.json());

require('./src/config/dbConfig')();

app.use('/api/v1', require('./src/routes'));


app.all('*', (req, res, next)=>{
    // res.status(404).json({
    //     'status':'fail',
    //     'message':`Can't find ${req.originalUrl} on this server`
    // });
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.status = 'fail';
    err.statusCode = 404;

    next(err);
});


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening to ${port}`);
})
