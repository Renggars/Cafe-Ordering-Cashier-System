import express from "express";
import validate from "../../middlewares/validate.js";
import { auth } from "../../middlewares/auth.js";

import menuController from "../../controllers/menu.controller.js";
import menuValidation from "../../validations/menuValidation.js";

const router = express.Router();

router
  .route("/")
  .post(auth(), validate(menuValidation.createMenu), menuController.createMenu)
  .get(validate(menuValidation.querySchema), menuController.getMenus);

router
  .route("/:menuId")
  .get(validate(menuValidation.getMenu), menuController.getMenu)
  .put(auth(), validate(menuValidation.updateMenu), menuController.updateMenu)
  .delete(
    auth(),
    validate(menuValidation.deleteMenu),
    menuController.deleteMenu
  );

export default router;
