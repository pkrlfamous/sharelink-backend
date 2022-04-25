class AppError extends Error{
    constructor(message, statusCode) {
        super(message) // when we extend the parent class we call super in order to call the parent constructor, we pass message as a parameter because the parent class accepts only this as a parameter. this is same as calling the Error() class.
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // status can be the fail or error we could pass that into the object but not necessary, cause it depends on the statusCode. so the when the statusCode is 400 then status will be fail if it is 500 it will be error.
        // all the error created with this class are always operationalError
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor); // first this specifies the current object.
        console.log('app error');
    }
}

module.exports = AppError;