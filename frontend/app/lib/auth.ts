import { apiRequest } from "./api";

export const loginUser = (data: {
  email: string;
  password: string;
}) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
