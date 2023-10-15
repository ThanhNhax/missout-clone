import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import CategorySlice from "./slices/CategorySlice";
import BlogsSlice from "./slices/BlogsSlice";
export const store = configureStore({
    reducer: {
        user: UserSlice,
        category: CategorySlice,
        blogs: BlogsSlice,
    },
});
