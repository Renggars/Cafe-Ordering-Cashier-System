import Joi from "joi";

const createOrder = {
  body: Joi.object().keys({
    customerName: Joi.string().required().messages({
      "string.empty": "Nama pelanggan tidak boleh kosong",
    }),
    notes: Joi.string().allow("", null).optional(),
    tableNumber: Joi.string().allow(null).optional(),
    paymentType: Joi.string().valid("CASH", "GATEWAY").required().messages({
      "any.only": "Metode pembayaran harus CASH atau GATEWAY",
    }),
    items: Joi.array()
      .items(
        Joi.object({
          menuId: Joi.number().integer().required(),
          quantity: Joi.number().integer().min(1).required(),
        }),
      )
      .min(1)
      .required()
      .messages({
        "array.min": "Minimal harus ada 1 menu yang dipesan",
      }),
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
