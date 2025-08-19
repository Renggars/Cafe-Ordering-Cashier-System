import Joi from "joi";

const createMenu = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    categoryId: Joi.number().integer().required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  name: Joi.string().optional(),
  categoryId: Joi.number().integer().optional(),
});

const getMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().required(),
  }),
};

const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number().integer(),
      categoryId: Joi.number().integer(),
    })
    .min(1),
};

const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.number().required(),
  }),
};

export default {
  createMenu,
  querySchema,
  getMenu,
  updateMenu,
  deleteMenu,
};
