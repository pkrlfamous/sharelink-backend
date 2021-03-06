const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value} use another value`
    return new AppError(message);
}

const handleValidationErrorDB = err =>{
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return AppError(message);
}

const sendErrorDev = (err, res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if (err.isOperational){
        res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        });
    }
    // Programming or other unknown erro: don't leak error details
    else {
        // 1 Log error
        console.log('ERROR OTHER THAN OPERATIONAL', err);
        // 2 Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Error other than operational, Something wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    console.log('middleware function');
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development'){
        sendErrorDev(err, res);
    }
    else if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        if(error.name === 'CastError') error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldsDB(error);
        if(error.name === 'ValidationError') error = handleValidationErrorDB(error)
        sendErrorProd(error, res);
    }  
}