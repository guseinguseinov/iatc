const errorMiddleware = (err, req, res, next) => {
    let message = err.message || 'Ooops! Something went wrong.';
  
    if (process.env.NODE_ENV === 'production') {
      message = 'Ooops! Something went wrong.';
      err = null;
    }
  
    res.status(500).json({
      message,
      err,
    });
  };

export default errorMiddleware;