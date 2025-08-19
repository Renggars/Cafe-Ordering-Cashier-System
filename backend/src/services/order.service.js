import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

const createOrder = async (data) => {
  const { customerName, notes, tableNumber, items } = data;

  return await prisma.$transaction(async (tx) => {
    const menuIds = items.map((item) => item.menuId);
    const menus = await tx.menu.findMany({
      where: { id: { in: menuIds } },
    });

    if (menus.length !== menuIds.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Some menu items do not exist."
      );
    }

    let totalPrice = 0;
    const orderItems = items.map((item) => {
      const menu = menus.find((m) => m.id === item.menuId);
      const price = menu.price * item.quantity;
      totalPrice += price;
      return {
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price,
      };
    });

    const order = await tx.order.create({
      data: {
        customerName,
        notes,
        tableNumber,
        totalPrice,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    return order;
  });
};

const getOrders = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 10);
  const skip = (page - 1) * limit;

  const where = {};
  if (filter.status) {
    where.status = filter.status;
  }

  const [orders, totalItems] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: { items: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.count({ where }),
  ]);

  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;

  const pagination = {
    totalItems,
    totalPages,
    currentPage,
  };

  return {
    orders,
    pagination,
  };
};

const getOrderById = async (orderId) => {
  const order = prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: { items: true },
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  return order;
};

const deleteOrder = async (orderId) => {
  await getOrderById(orderId);

  return prisma.order.delete({
    where: { id: Number(orderId) },
  });
};

const payOrder = async (orderId, cashierId) => {
  return await prisma.order.update({
    where: { id: Number(orderId) },
    data: {
      status: "CONFIRMED",
      cashierId,
      paidAt: new Date(),
    },
    include: { items: true },
  });
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  payOrder,
};
