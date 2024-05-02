const Joi = require("joi");
const logger = require("../utils/logger")

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  mobileNumber:Joi.string().pattern(/^[0-9]{10}$/).required(),
  email: Joi.string().email().required(),
  password:  Joi.string().min(8).max(10).required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    logger.error(`Error in Validatin user ${error}`)
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const validateLoginUser = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    logger.error(`Incorrect Credentails`)
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateUser, validateLoginUser };
