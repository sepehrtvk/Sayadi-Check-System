import axios from "axios";
import { API_PORT, API_URL, loginDetails } from "../app-config";

export type Login = {
  jwt: string;
};

export async function login() {
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

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
