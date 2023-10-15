import React from "react";
import BlogsApi from "../../src/services/BlogsApi";
import MainLayout from "../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import CardPosts from "../../src/components/cards/CardPosts";

export default function blogsSlug({ arrBlogs }) {
    console.log({ arrBlogs });
    const { blog, rows } = arrBlogs;
    return (
        <MainLayout>
            <Breadcrumbs nameCategory={blog.title} />

            <div className="container mx-auto px-[15px]">
                <h1 className="text-2xl font-bold text-center mb-[30px] pb-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
                    {blog.title}
                </h1>
                <div className="">
                    {rows.map((item, index) => {
                        return <CardPosts key={index} item={item} />;
                    })}
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async ({ query }) => {
    const arrBlogs = await BlogsApi.getArrBlogs(query.slug);
    return { props: { arrBlogs } };
};
