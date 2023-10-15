import React from "react";
import BlogsApi from "../../src/services/BlogsApi";
import MainLayout from "../../src/components/layouts/MainLayout";

export default function detailPost({ itemPost }) {
    console.log(itemPost.data.body);
    return (
        <MainLayout>
            <h1></h1>
            <article className="prose mx-auto lg:prose-xl">
                <div dangerouslySetInnerHTML={{ __html: itemPost.data.body }} />
            </article>
        </MainLayout>
    );
}

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps = async ({ params }) => {
    const itemPost = await BlogsApi.getDetailPost({ query: params });
    return { props: { itemPost }, revalidate: 60 };
};
