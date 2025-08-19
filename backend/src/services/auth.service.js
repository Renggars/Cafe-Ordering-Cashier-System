import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/index.js";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }

  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export default { loginUserWithEmailAndPassword };
