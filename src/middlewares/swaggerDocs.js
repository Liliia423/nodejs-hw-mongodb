import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = (swaggerDoc) => {
  try {
    return [swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
