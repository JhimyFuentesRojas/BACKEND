const Joi = require("@hapi/joi");
//const JoiValidator = require('@wastimy/joi-middleware');

const productoVerificar = Joi.object({
  name: Joi.string().min(5).required(),
  price: Joi.number().positive().required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productoVerificar.validate(req.body);
  if (error) {
    return res.status(400).json({
      statusCode: 400,
      error: "Solicitud Incorrecta :(",
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = validateProduct;
