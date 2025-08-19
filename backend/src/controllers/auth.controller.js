import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import authService from "../services/auth.service.js";
import userService from "../services/user.service.js";
import tokenService from "../services/token.service.js";
import ApiError from "../utils/ApiError.js";

const register = catchAsync(async (req, res) => {
  const existingUser = await userService.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }

  const userCreated = await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({
    message: "Register success",
    data: {
      user: userCreated,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ message: "Login success", data: { user, tokens } });
});

export default {
  register,
  login,
};
