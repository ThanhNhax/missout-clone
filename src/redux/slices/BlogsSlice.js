import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../config";

const initialState = {
    arrCollectionBlogs: undefined,
};

const BlogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setArrCollectionBlogs: (state, actions) => {
            state.arrCollectionBlogs = actions.payload;
        },
    },
});

export const { setArrCollectionBlogs } = BlogsSlice.actions;

export default BlogsSlice.reducer;

export const getArrBlogs = () => {
    return async (dispatch) => {
        try {
            let result = await axiosClient.get("/blog");
            dispatch(setArrCollectionBlogs(result.data.data));
        } catch (e) {
            console.log(e);
        }
    };
};
