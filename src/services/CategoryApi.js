import axiosClient from "../config"

const CategoryApi = {
    getAll:async() => {
        const result = await axiosClient.get('/category');
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/category',data)
        return result.data;
    },
    update:async({id, data}) => {
        const result = await axiosClient.put(`/category/${id}`,data)
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/category/${id}`)
        return result.data
    }
}

export default CategoryApi