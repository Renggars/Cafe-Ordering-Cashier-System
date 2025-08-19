import Joi from "joi";

const createOrder = {
  body: Joi.object().keys({
    customerName: Joi.string().required(),
    notes: Joi.string().allow("", null).optional(),
    tableNumber: Joi.number().integer().optional(),
    items: Joi.array()
      .items(
        Joi.object({
          menuId: Joi.number().integer().required(),
          quantity: Joi.number().integer().min(1).default(1),
        })
      )
      .min(1)
      .required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  status: Joi.string().valid("PENDING", "CONFIRMED").optional(),
});

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};

const payOrder = {
  params: Joi.object().keys({
    orderId: Joi.number().required(),
  }),
};

export default {
  createOrder,
  querySchema,
  getOrder,
  deleteOrder,
  payOrder,
};
