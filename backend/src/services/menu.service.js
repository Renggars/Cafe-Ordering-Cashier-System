import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";
import uploadFile from "../utils/uploadFile.js";

const BUCKET_NAME = "menu-images";

/**
 * Create a menu
 * @param {Object} menuBody
 * @returns {Promise<Menu>}
 */
const createMenu = async (menuBody, file) => {
  let imageUrl = null;
  if (file) {
    imageUrl = await uploadFile(file, BUCKET_NAME);
  }
  const newMenu = await prisma.menu.create({
    data: {
      ...menuBody,
      imageUrl,
    },
  });

  return newMenu;
};

/**
 * Query for menus
 * @returns {Promise<QueryResult>}
 */
const queryMenus = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 10);
  const skip = (page - 1) * limit;

  const menus = await prisma.menu.findMany({
    skip,
    take: limit,
    where: filter,
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });

  const totalItems = await prisma.menu.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    menus,
    pagination: { totalItems, totalPages, currentPage: page },
  };
};

/**
 * Get menu by id
 * @param {number} menuId
 * @returns {Promise<Menu>}
 */
const getMenuById = async (menuId) => {
  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
    include: {
      category: {
        select: { id: true, name: true },
      },
    },
  });

  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }

  return menu;
};

/**
 * Update menu by id
 * @param {number} menuId
 * @param {Object} updateBody
 * @returns {Promise<Menu>}
 */
const updateMenuById = async (menuId, updateBody, file) => {
  const menu = await getMenuById(menuId);
  const oldImageUrl = menu.imageUrl;
  let newImageUrl = oldImageUrl;

  if (file) {
    newImageUrl = await uploadFile(file, BUCKET_NAME, oldImageUrl);
  } else if (updateBody.imageUrl === null) {
    if (oldImageUrl) {
      const { data: removeData, error: removeError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([oldImageUrl.split("/").pop()]);
      if (removeError) {
        console.warn("Failed to remove old image:", removeError.message);
      }
    }
    newImageUrl = null;
  }

  const updatedMenu = await prisma.menu.update({
    where: { id: menuId },
    data: {
      ...updateBody,
      imageUrl: newImageUrl,
    },
  });

  return updatedMenu;
};

/**
 * Delete menu by id
 * @param {number} menuId
 * @returns {Promise<Menu>}
 */
const deleteMenuById = async (menuId) => {
  const menu = await getMenuById(menuId);

  // Hapus gambar dari Supabase Storage jika ada
  if (menu.imageUrl) {
    const filename = menu.imageUrl.split("/").pop();
    const { error: removeError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filename]);

    if (removeError) {
      console.warn("Gagal menghapus file lama:", removeError.message);
    }
  }

  const deletedMenu = await prisma.menu.delete({
    where: { id: menuId },
  });

  return deletedMenu;
};

export default {
  createMenu,
  queryMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
