import createHttpError from 'http-errors';

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createHttpError(400, error.message));
    } else {
      next();
    }
  };
};

export default validateBody;
