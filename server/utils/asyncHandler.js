const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
        console.log(error);
        next(error);
    }
  };
};

export default asyncHandler;