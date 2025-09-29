const Joi = require("joi");

const baseSchema = {
  name: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(500),
};

const createLabelSchema = Joi.object({
  labelTitle: baseSchema.name.required(),
  labelDescription: baseSchema.description.required(),
});

const updateLabelSchema = Joi.object({
  labelTitle: baseSchema.name.optional(),
  labelDescription: baseSchema.description.optional(),
});

const validate =
  (schema, sources = ["body"]) =>
  (req, res, next) => {
    const data = sources.reduce((acc, source) => {
      return { ...acc, ...req[source] };
    }, {});

    const { error } = schema.validate(data, { abortEarly: true });
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
  createLabel: validate(createLabelSchema, ["body"]),
  updateLabel: validate(updateLabelSchema, ["body"]),
};
