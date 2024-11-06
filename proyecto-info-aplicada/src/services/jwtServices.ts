import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { User } from "../model/Interfaces";

export const useJwt = () => {

  const getUserInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decodedUser = jwtDecode<any>(token);
    return decodedUser;
  };

  const getUserFromToken = (): User | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decodedToken = jwtDecode<any>(token);

    const user: User = {
      id: decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      username:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
      firstName:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ],
      lastName:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
        ],
      email:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
      birthDate:
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/dateofbirth"
        ],
      password: "",
    };

    return user;
  };

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!token) return config;
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      window.location.href = "/unauthorized";
      return Promise.reject("Token expired");
    }

    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });

  return {
    getUserInfo,
    getUserFromToken,
  };
};
