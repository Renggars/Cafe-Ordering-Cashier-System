import orderService from "../services/order.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    responseApiCreateSuccess(res, "Order created successfully", order);
  } catch (error) {
    responseApiFailed(res, `Failed create order: ${error}`);
  }
};

const getOrders = async (req, res) => {
  try {
    const { page, limit, status, ...filter } = req.query;
    const result = await orderService.getOrders(
      { status, ...filter },
      {
        status,
        page,
        limit,
      }
    );
    responseApiSuccess(res, "Success get orders", result);
  } catch (error) {
    responseApiFailed(res, `Failed get orders: ${error}`);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId);
    responseApiSuccess(res, "Success get order", order);
  } catch (error) {
    responseApiFailed(res, `Failed get order: ${error}`);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const result = await orderService.deleteOrder(req.params.orderId);
    responseApiSuccess(res, "Order deleted successfully", result);
  } catch (error) {
    responseApiFailed(res, `Failed delete order: ${error}`);
  }
};

const payOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updated = await orderService.payOrder(orderId, req.user.id);
    responseApiSuccess(res, "Order marked as paid", updated);
  } catch (error) {
    responseApiFailed(res, `Failed to pay order: ${error}`);
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  payOrder,
};
