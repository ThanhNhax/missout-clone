import axiosClient from "../config";

const ColorApi = {
  getAll: async () => {
    const result = await axiosClient.get("/color");
    return result.data.data;
  },
  add: async (data) => {
    const result = await axiosClient.post("/color", data);
    return result.data;
  },
  update: async ({ id, data }) => {
    const result = await axiosClient.put(`/color/${id}`, data);
    return result.data;
  },
  delete: async (id) => {
    const result = await axiosClient.delete(`/color/${id}`);
    return result.data;
  },
};

export default ColorApi;
