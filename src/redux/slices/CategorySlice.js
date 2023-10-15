import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../config";

const initialState = {
    arrCategory: undefined,
};

export const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setArrCategory: (state, action) => {
            state.arrCategory = action.payload;
        },
    },
});

export const { setArrCategory } = CategorySlice.actions;

export default CategorySlice.reducer;

export const getArrCategory = () => {
    return async (dispatch) => {
        try {
            let result = await axiosClient.get("/category");
            dispatch(setArrCategory(result.data.data));
        } catch (e) {
            console.log(e);
        }
    };
};
