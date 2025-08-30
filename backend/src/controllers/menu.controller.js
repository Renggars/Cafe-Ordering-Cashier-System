import menuService from "../services/menu.service.js";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const createMenu = async (req, res) => {
  try {
    const result = await menuService.createMenu(req.body, req.file);
    responseApiCreateSuccess(res, "Success create menu", result);
  } catch (err) {
    responseApiFailed(res, `Failed create menu ${err}`);
    console.log(err);
  }
};

const getMenus = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const result = await menuService.queryMenus(filter, { page, limit });
    responseApiSuccess(res, "Success get menus", result);
  } catch (err) {
    responseApiFailed(res, `Failed get menus ${err}`);
  }
};

const getMenu = async (req, res) => {
  try {
    const result = await menuService.getMenuById(parseInt(req.params.menuId));
    responseApiSuccess(res, "Success get menu", result);
  } catch (err) {
    responseApiFailed(res, `Failed get menu ${err}`);
  }
};

const updateMenu = async (req, res) => {
  try {
    const result = await menuService.updateMenuById(
      parseInt(req.params.menuId),
      req.body,
      req.file
    );
    responseApiSuccess(res, "Success update menu", result);
  } catch (err) {
    responseApiFailed(res, `Failed update menu ${err}`);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const result = await menuService.deleteMenuById(
      parseInt(req.params.menuId)
    );
    responseApiSuccess(res, "Success delete menu", result);
  } catch (err) {
    responseApiFailed(res, `Failed delete menu ${err}`);
  }
};

export default {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
