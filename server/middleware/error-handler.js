import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message : err.message || 'something went wrong try again '
    }
    if (err.name == 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = Object.values(err.errors).map(item => item.message).join(',')
        
    }
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.message = `${Object.keys(err.keyValue)} field has to be unique`
    }
  
    res.status(defaultError.statusCode).json({ msg: defaultError.message });
};

export default errorHandlerMiddleware;