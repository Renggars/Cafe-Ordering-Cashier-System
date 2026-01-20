import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

const updateStatusFromMidtrans = async (statusResponse) => {
  const orderIdFromMidtrans = statusResponse.order_id;
  const transactionStatus = statusResponse.transaction_status;
  const fraudStatus = statusResponse.fraud_status;

  let finalStatus = "";

  if (transactionStatus === "capture") {
    // Capture khusus untuk Kartu Kredit
    if (fraudStatus === "challenge") {
      finalStatus = "PENDING"; // Transaksi dicurigai, perlu review manual
    } else if (fraudStatus === "accept") {
      finalStatus = "CONFIRMED"; // Transaksi kartu aman
    }
  } else if (transactionStatus === "settlement") {
    // Settlement untuk QRIS, GoPay, ShopeePay, Transfer Bank
    finalStatus = "CONFIRMED";
  } else if (
    transactionStatus === "cancel" ||
    transactionStatus === "deny" ||
    transactionStatus === "expire"
  ) {
    // Opsional: Kamu bisa set status jadi "FAILED" jika enum-mu ada
    finalStatus = "FAILED";
  }

  if (finalStatus !== "") {
    return await prisma.order.update({
      where: {
        id: parseInt(orderIdFromMidtrans),
      },
      data: {
        status: finalStatus,
        paidAt: finalStatus === "CONFIRMED" ? new Date() : null,
      },
    });
  }

  return null;
};

const createOrder = async (data) => {
  const { customerName, notes, tableNumber, items, paymentType } = data;

  return await prisma.$transaction(async (tx) => {
    const menuIds = items.map((item) => item.menuId);
    const menus = await tx.menu.findMany({
      where: { id: { in: menuIds } },
    });

    let totalPrice = 0;

    const orderItems = items.map((item) => {
      const menu = menus.find((m) => m.id === item.menuId);
      if (!menu)
        throw new Error(`Menu dengan ID ${item.menuId} tidak ditemukan`);

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
        tableNumber: tableNumber ? String(tableNumber) : null,
        paymentType,
        totalPrice,
        status: "PENDING",
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          select: {
            menuId: true,
            quantity: true,
            price: true,
          },
        },
      },
    });

    return {
      id: order.id,
      customerName: order.customerName,
      tableNumber: order.tableNumber,
      paymentType: order.paymentType,
      status: order.status,
      totalPrice: order.totalPrice,
      items: order.items,
    };
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
  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
    include: {
      items: {
        include: {
          menu: true,
        },
      },
    },
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
  updateStatusFromMidtrans,
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  payOrder,
};
