import axiosClient from "../config"

const BlogApi = {
    getAll:async() => {
        const result = await axiosClient.get('/blog');
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/blog',data)
        return result.data;
    },
    update:async({id, data}) => {
        const result = await axiosClient.put(`/blog/${id}`,data)
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/blog/${id}`)
        return result.data
    }
}

export default BlogApi