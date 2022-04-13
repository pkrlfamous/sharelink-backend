class CustomError extends Error{
    constructor(message, statusCode){

    super(message); // it's calling like Error the main class
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;