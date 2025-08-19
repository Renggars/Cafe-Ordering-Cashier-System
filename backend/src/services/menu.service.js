import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a menu
 * @param {Object} menuBody
 * @returns {Promise<Menu>}
 */
const createMenu = async (menuBody) => {
  const newMenu = await prisma.menu.create({
    data: menuBody,
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
    include: { category: true },
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
const updateMenuById = async (menuId, updateBody) => {
  await getMenuById(menuId);

  const updatedMenu = await prisma.menu.update({
    where: { id: menuId },
    data: updateBody,
  });

  return updatedMenu;
};

/**
 * Delete menu by id
 * @param {number} menuId
 * @returns {Promise<Menu>}
 */
const deleteMenuById = async (menuId) => {
  await getMenuById(menuId);

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
