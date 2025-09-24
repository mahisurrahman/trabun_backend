function responseMiddleware(req, res, next) {

    res.success = (data, status = 200, message = 'Success') => {
      res.status(status).json({
        data,
        error: false,
        status,
        message,
      });
    };
  
    res.error = (message, status = 500, data = null) => {
      res.status(status).json({
        data,
        error: true,
        status,
        message,
      });
    };
  
    next();
  }
  
  module.exports = responseMiddleware;