import { api } from "../repositories/users.json";

interface ICheckCredentials {
  email: string;
  password: string;
}

export async function checkCredentials({ email, password }: ICheckCredentials) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const resAPI = api.find(
    (api) => api.user.email === email && api.user.password === password
  );
  if (!resAPI) {
    throw new Error("Email or password is worng");
  }
  return resAPI;
}
