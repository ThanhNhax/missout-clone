import axiosClient from "../config";

const UserApi = {
  getAll: async (query) => {
    const result = await axiosClient.get("/user", {
      params:query
    });
    return result.data.data;
  },
  addUser:async(data) => {
    const result = await axiosClient.post('/user',data);
    return result.data
  },
  updateUser:async({id, payload}) => {
    const result = await axiosClient.put(`/user/${id}`,{...payload})
    return result.data
  },
  lockUser:async(id) => {
    const result = await axiosClient.delete(`/user/${id}`);
    return result.data
  }
};

export default UserApi;
