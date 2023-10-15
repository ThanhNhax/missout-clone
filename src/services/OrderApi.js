import axiosClient from "../config"

const OrderApi = {
    getAll:async(query) => {
        const result = await axiosClient.get('/order',{params:query});
        return result.data.data
    },
    update:async({id,data}) => {
        const result = await axiosClient.put(`/order/${id}`,data)
        return result.data
    }
}

export default OrderApi