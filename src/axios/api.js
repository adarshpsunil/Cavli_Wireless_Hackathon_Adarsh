import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
const apiFile = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/formdata",
  },
});

export const uploadFile = (data) => apiFile.post("/uploads", data);
export const getFiles = () => api.get("/uploads");
export const getFile = (id) => api.get(`/uploads/${id}`);
