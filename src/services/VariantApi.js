import axiosClient from "../config"

const VariantApi = {
    update:async({id, data}) => {
        const result = await axiosClient.put(`/product/variant/${id}`,data)
        return result.data
    }
}

export default VariantApi