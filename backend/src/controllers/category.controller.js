import categoryService from "../services/category.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    responseApiCreateSuccess(res, "Success create category", result);
  } catch (err) {
    responseApiFailed(res, `Failed create category ${err}`);
  }
};

const getCategories = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const result = await categoryService.queryCategories(filter, {
      page,
      limit,
    });
    responseApiSuccess(res, "Success get categories", result);
  } catch (err) {
    responseApiFailed(res, `Failed get categories ${err}`);
  }
};

const getCategory = async (req, res) => {
  try {
    const result = await categoryService.getCategoryById(
      parseInt(req.params.categoryId)
    );
    responseApiSuccess(res, "Success get category", result);
  } catch (err) {
    responseApiFailed(res, `Failed get category ${err}`);
  }
};

const updateCategory = async (req, res) => {
  try {
    const result = await categoryService.updateCategoryById(
      parseInt(req.params.categoryId),
      req.body
    );
    responseApiSuccess(res, "Success update category", result);
  } catch (err) {
    responseApiFailed(res, `Failed update category ${err}`);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategoryById(
      parseInt(req.params.categoryId)
    );
    responseApiSuccess(res, "Success delete category", result);
  } catch (err) {
    responseApiFailed(res, `Failed delete category ${err}`);
  }
};

export default {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
