import prisma from "../../prisma/index.js";

const getSettings = async () => {
  // Mencari setting ID 1, jika tidak ada maka buat default
  return prisma.globalSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      taxPercentage: 0,
      isTaxActive: false,
      servicePercentage: 0,
      isServiceActive: false,
      discountPercentage: 0,
      isDiscountActive: false,
    },
  });
};

const updateSettings = async (updateBody) => {
  return prisma.globalSetting.update({
    where: { id: 1 },
    data: updateBody,
  });
};

export default {
  getSettings,
  updateSettings,
};
