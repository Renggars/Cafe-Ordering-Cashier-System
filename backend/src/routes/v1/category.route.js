import express from "express";
import validate from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";
import categoryValidation from "../../validations/category.validation.js";
import categoryController from "../../controllers/category.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(categoryValidation.createCategory),
    categoryController.createCategory
  )
  .get(
    validate(categoryValidation.querySchema),
    categoryController.getCategories
  );

router
  .route("/:categoryId")
  .get(validate(categoryValidation.getCategory), categoryController.getCategory)
  .put(
    auth(),
    validate(categoryValidation.updateCategory),
    categoryController.updateCategory
  )
  .delete(
    auth(),
    validate(categoryValidation.deleteCategory),
    categoryController.deleteCategory
  );

export default router;
