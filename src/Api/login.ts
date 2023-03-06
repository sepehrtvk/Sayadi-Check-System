import axios from "axios";
import { API_PORT, API_URL, loginDetailsVaranegar } from "../app-config";

export type Login = {
  jwt: string;
};
export type LoginDetails = {
  identifier: string;
  password: string;
};

export async function login(loginDetails: LoginDetails | null) {
  try {
    const { data } = await axios.post<Login>(
      API_URL + ":" + API_PORT + "/api/auth/local",
      loginDetails,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    localStorage.setItem("token", data.jwt);
    if (loginDetails?.identifier == loginDetailsVaranegar?.identifier)
      localStorage.setItem("idType", "2");
    else localStorage.setItem("idType", "1");

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
