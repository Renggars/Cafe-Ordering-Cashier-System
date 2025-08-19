import Joi from "joi";
import { password } from "./custom.validation.js";

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
});

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const getUserByEmail = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string().optional(),
      email: Joi.string().email().optional(),
      role: Joi.string().valid("CASHIER", "ADMIN").optional(),
      password: Joi.string().optional().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default {
  createUser,
  querySchema,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  loginUser,
};
