import Joi from "joi";

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  name: Joi.string().optional(),
});

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.number().required(),
  }),
};

export default {
  createCategory,
  querySchema,
  getCategory,
  updateCategory,
  deleteCategory,
};
