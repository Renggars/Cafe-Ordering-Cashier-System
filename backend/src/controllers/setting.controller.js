import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import settingService from "../services/setting.service.js";

const getSettings = catchAsync(async (req, res) => {
  const settings = await settingService.getSettings();
  res.send(settings);
});

const updateSettings = catchAsync(async (req, res) => {
  const settings = await settingService.updateSettings(req.body);
  res.send(settings);
});

export default {
  getSettings,
  updateSettings,
};
