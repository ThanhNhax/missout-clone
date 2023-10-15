import axiosClient from "../config";

const PostApi = {
  getAll: async (query) => {
    const result = await axiosClient.get("/post", { params: query });
    return result.data.data;
  },
  add: async (data) => {
    const result = await axiosClient.post("/post", data);
    return result.data;
  },
  update: async ({ id, data }) => {
    const result = await axiosClient.put(`/post/${id}`, data);
    return result.data;
  },
  delete: async (id) => {
    const result = await axiosClient.delete(`/post/${id}`);
    return result.data;
  },
  getPostBySlug: async (slug) => {
    const result = await axiosClient.get(`/post/detail/${slug}`);
    return result.data.data;
  },
};

export default PostApi;
