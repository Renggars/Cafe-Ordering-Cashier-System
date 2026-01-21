import express from "express";
import validate from "../../middlewares/validate.js";
import orderValidation from "../../validations/order.validation.js";
import orderController from "../../controllers/order.controller.js";
import { auth, authOptional } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .post(
    authOptional(),
    validate(orderValidation.createOrder),
    orderController.createOrder,
  )
  .get(
    auth(),
    validate(orderValidation.querySchema),
    orderController.getOrders,
  );

router
  .route("/:orderId")
  .get(validate(orderValidation.getOrder), orderController.getOrderById)
  .delete(
    auth(),
    validate(orderValidation.deleteOrder),
    orderController.deleteOrder,
  );

router.put("/:orderId/pay", auth(), orderController.payOrder);

export default router;
