import axiosClient from "../config"

const SizeApi = {
    getAll:async() => {
        const result = await axiosClient.get('/size');
        return result.data.data
    },
    add:async(data) => {
        const result = await axiosClient.post('/size',data)
        return result.data
    },
    update:async({id,data}) => {
        const result = await axiosClient.put(`/size/${id}`,data)
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/size/${id}`)
        return result.data
    }
}

export default SizeApi