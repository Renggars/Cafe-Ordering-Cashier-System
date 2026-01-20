import orderService from "../services/order.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";
import midtransClient from "midtrans-client";
import crypto from "crypto";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const midtransCallback = async (req, res) => {
  try {
    const { order_id, status_code, gross_amount, signature_key } = req.body;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const dataToHash = `${order_id}${status_code}${gross_amount}${serverKey}`;

    const mySignature = crypto
      .createHash("sha512")
      .update(dataToHash)
      .digest("hex");

    if (mySignature !== signature_key) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Signature Key! Request ditolak karena tidak aman.",
      });
    }

    await orderService.updateStatusFromMidtrans(req.body);

    res.status(200).json({
      status: true,
      message: "Callback processed successfully",
    });
  } catch (error) {
    console.error("Midtrans Callback Error:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { paymentType, customerName } = req.body;

    const order = await orderService.createOrder(req.body);

    let resultData = { ...order };

    if (paymentType?.toUpperCase() === "GATEWAY") {
      const parameter = {
        transaction_details: {
          order_id: order.id,
          gross_amount: order.totalPrice,
        },
        customer_details: {
          first_name: customerName,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      resultData.snapToken = transaction.token;
    }

    responseApiCreateSuccess(res, "Order created successfully", resultData);
  } catch (error) {
    console.error("Create Order Error:", error.message);
    responseApiFailed(res, `Failed create order: ${error.message}`);
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
      },
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
  midtransCallback,
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  payOrder,
};
