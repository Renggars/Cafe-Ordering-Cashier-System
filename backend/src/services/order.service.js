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

const createOrder = async (data, cashierId = null) => {
  const { customerName, notes, tableNumber, items, paymentType } = data;

  return await prisma.$transaction(async (tx) => {
    // 1. Ambil Data pajak, tax, diskon (Selalu ID 1)
    const settings = await tx.globalSetting.findUnique({
      where: { id: 1 },
    });

    // 2. Ambil data menu
    const menuIds = items.map((item) => item.menuId);
    const menus = await tx.menu.findMany({
      where: { id: { in: menuIds } },
    });

    // 3. Hitung subTotal & Map Data Items
    let subTotal = 0;
    const orderItemsData = items.map((item) => {
      const menu = menus.find((m) => m.id === item.menuId);
      if (!menu)
        throw new Error(`Menu dengan ID ${item.menuId} tidak ditemukan`);

      const itemPrice = menu.price * item.quantity;
      subTotal += itemPrice;

      return {
        menuId: item.menuId,
        quantity: item.quantity,
        price: menu.price, // Harga satuan saat transaksi terjadi
      };
    });

    // 4. Kalkulasi Pajak, Service, dan Diskon berdasarkan GlobalSetting
    let taxAmount = 0;
    let serviceAmount = 0;
    let discountAmount = 0;

    if (settings) {
      if (settings.isTaxActive) {
        taxAmount = Math.round(subTotal * (settings.taxPercentage / 100));
      }
      if (settings.isServiceActive) {
        serviceAmount = Math.round(
          subTotal * (settings.servicePercentage / 100),
        );
      }
      if (settings.isDiscountActive) {
        discountAmount = Math.round(
          subTotal * (settings.discountPercentage / 100),
        );
      }
    }

    const totalPrice = subTotal + taxAmount + serviceAmount - discountAmount;

    /**
     * 5. LOGIKA STATUS
     * - Jika cashierId ada (Request dari Flutter POS), status langsung CONFIRMED & paidAt diisi.
     * - Jika cashierId null (Request dari Website), status PENDING.
     */
    const isFromCashier = cashierId !== null;
    const status = isFromCashier ? "CONFIRMED" : "PENDING";
    const paidAt = isFromCashier ? new Date() : null;

    const order = await tx.order.create({
      data: {
        customerName,
        notes,
        tableNumber: tableNumber ? String(tableNumber) : null,
        paymentType,
        status,
        paidAt,
        cashierId,
        subTotal,
        taxAmount,
        serviceAmount,
        discountAmount,
        totalPrice,
        items: {
          create: orderItemsData,
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

    return order;
  });
};

const getOrders = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 25);
  const skip = (page - 1) * limit;

  const where = {};
  if (filter.status) {
    where.status = filter.status;
  }

  // Filter Search
  if (filter.search) {
    const searchInt = parseInt(filter.search);

    where.OR = [
      // Cari berdasarkan nama pelanggan (String)
      { customerName: { contains: filter.search, mode: "insensitive" } },
    ];

    // Jika input search adalah angka, tambahkan filter untuk mencari ID secara spesifik
    if (!isNaN(searchInt)) {
      where.OR.push({ id: searchInt });
    }
  }

  const [orders, totalItems] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: {
          include: {
            menu: true,
          },
        },
        cashier: {
          select: { username: true },
        },
      },
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
    perPage: limit,
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
  const order = await prisma.order.findUnique({
    where: { id: Number(orderId) },
  });
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, "Order tidak ditemukan");

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
