import Joi from "joi";

const updateSettings = {
  body: Joi.object().keys({
    taxPercentage: Joi.number().min(0).max(100),
    isTaxActive: Joi.boolean(),
    servicePercentage: Joi.number().min(0).max(100),
    isServiceActive: Joi.boolean(),
    discountPercentage: Joi.number().min(0).max(100),
    isDiscountActive: Joi.boolean(),
  }),
};

export default {
  updateSettings,
};
