import axiosClient from "../config";

const BlogsApi = {
    getArrBlogs: async (name) => {
        try {
            let reuslt = await axiosClient.get(
                `/post/search?page=1&limit=8&blog=${name}`
            );
            return reuslt.data.data;
            //trả về cái token
        } catch (e) {
            return e;
        }
    },
    getDetailPost: async ({ query }) => {
        try {
            let reuslt = await axiosClient.get(`/post/detail/${query.slug}`);
            return reuslt.data;
            //trả về cái token
        } catch (e) {
            return e;
        }
    },
};

export default BlogsApi;
