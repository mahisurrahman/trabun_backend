const Joi = require("joi");

const baseSchema = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  traId: Joi.string().required(),
  designation: Joi.string().required(),
  userType: Joi.number().required(),
};

const createUser = Joi.object({
  username: baseSchema.username,
  email: baseSchema.email,
  password: baseSchema.password,
  traId: baseSchema.traId,
  designation: baseSchema.designation,
  userType: baseSchema.userType,
});

const validate =
  (schema, sources = ["body"]) =>
  (req, res, next) => {
    const data = sources.reduce((acc, source) => {
      return { ...acc, ...req[source] };
    }, {});

    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json({
        error: true,
        status: 400,
        message: error.details[0].message,
        data: null,
      });
    }
    next();
  };

module.exports = {
  createUser: validate(createUser, ["body"]),
};
