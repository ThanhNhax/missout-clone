import axiosClient from "../config";

const productApi = {
    allProduct: async () => {
        try {
            const response = await axiosClient.get("/product/search");
            return response.data.data.rows;
        } catch (e) {
            return e;
        }
    },
    getAllAdmin:async(query) => {
        const result = await axiosClient.get('/product',{params:query});
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/product',data)
        return result.data;
    },
    getProductBySlug:async(slug) => {
        const result = await axiosClient.get(`/product/detail/${slug}`);
        return result.data.data
    },
    update:async({id, data}) => {
        const result = await axiosClient.put(`/product/${id}`,data);
        return result.data;
    },
    queryProduct: async ({ query }) => {
        const res = await axiosClient.get(`/product/search?`, {
            params: query,
        });
        return res.data.data;
    },
    getProductByslug: async ({ query }) => {
        const res = await axiosClient.get(`/product/detail/${query.slug}`);
        return res.data.data;
    },
    confirmCart:async(variants) => {
        const result = await axiosClient.post(`/product/cart`,{variants})
        return result.data.data
    }
};

export default productApi;
