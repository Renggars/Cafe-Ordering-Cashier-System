import express from "express";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";
import categoryRoute from "./category.route.js";
import menuRoute from "./menu.route.js";
import orderRoute from "./order.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/menu",
    route: menuRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
