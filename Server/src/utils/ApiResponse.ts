import pkg from "express";

export const ApiResponse = (
  res: pkg.Response,
  status: number,
  message: any,
  success: boolean,
) => {
  return res.status(status).json({
    message,
    success,
  });
};
