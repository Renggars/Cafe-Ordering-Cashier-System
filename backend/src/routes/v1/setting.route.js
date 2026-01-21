import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import settingValidation from "../../validations/setting.validation.js";
import settingController from "../../controllers/setting.controller.js";

const router = express.Router();

// Semua akses membutuhkan auth()
router
  .route("/")
  .get(auth(), settingController.getSettings)
  .patch(
    auth(),
    validate(settingValidation.updateSettings),
    settingController.updateSettings,
  );

export default router;
