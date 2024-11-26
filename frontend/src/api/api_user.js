import axios from "axios";

const conexion_user = axios.create({
  baseURL: "http://localhost:8000/user/",
});

export const AuthUser = (data) => conexion_user.post("authuser/", data);

export const RegisterUser = (data) => conexion_user.post("registeruser/", data);

export const GetUserdata = (params) =>
  conexion_user.get("getUserData/", { params: params });

export const UpdateUser = (data, username) =>
  conexion_user.put(`updateuser/${username}/`, data);

export const DeleteAccount = (user) =>
  conexion_user.delete(`deleteaccount/${user}/`);

export const GetAddresses = (user) =>
  conexion_user.get(`getaddresses/${user}/`);

export const CreateAddress = (data, user) =>
  conexion_user.post(`createaddress/${user}/`, data);

export const DeleteAddress = (id) =>
  conexion_user.delete(`deleteaddress/${id}/`);

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
