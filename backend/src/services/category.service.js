import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  const newCategory = await prisma.category.create({
    data: categoryBody,
  });

  return newCategory;
};

/**
 * Query categories with pagination
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async (filter, options) => {
  const page = parseInt(options.page || 1);
  const limit = parseInt(options.limit || 10);
  const skip = (page - 1) * limit;

  const categories = await prisma.category.findMany({
    skip,
    take: limit,
    where: filter,
    include: {
      menus: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  const totalItems = await prisma.category.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    categories,
    pagination: { totalItems, totalPages, currentPage: page },
  };
};

/**
 * Get category by id
 * @param {number} categoryId
 * @returns {Promise<Category>}
 */
const getCategoryById = async (categoryId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      menus: true,
    },
  });

  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
  }

  return category;
};

/**
 * Update category by id
 * @param {number} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  await getCategoryById(categoryId);

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: updateBody,
    select: {
      id: true,
      name: true,
    },
  });

  return updatedCategory;
};

/**
 * Delete category by id
 * @param {number} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  await getCategoryById(categoryId);

  const deletedCategory = await prisma.category.delete({
    where: { id: categoryId },
    select: {
      id: true,
      name: true,
    },
  });

  return deletedCategory;
};

export default {
  createCategory,
  queryCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
