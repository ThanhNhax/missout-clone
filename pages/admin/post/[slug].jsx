import React, { useState } from "react";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FcAddImage } from "react-icons/fc";
import dynamic from "next/dynamic";
import { generateSlug } from "../../../src/utils/generateSlug";
import BlogApi from "../../../src/services/BlogApi";
import PostApi from "../../../src/services/PostApi";
import uploadCloudinary from "../../../src/config/uploadCloudinary";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";

const TranslationArea = dynamic(
  () => import("../../../src/components/TranslationArea"),
  {
    ssr: false,
  }
);

const UpdatePost = ({ post }) => {
  const initialValues = {
    slug: post.slug,
    title: post.title,
    description: post.description,
    body: post.body,
    image: post.image,
    blogId: post.blogId,
  };

  const router = useRouter();
  const { data: blogs } = useQuery(["blogs"], BlogApi.getAll);

  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation(PostApi.update, {
    onSuccess: (data, variables) => {
      toast.success("Cập nhật bài viết thành công");
      setIsLoading(false);
      router.push("/admin/post");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
      setIsLoading(false);
      router.push("/admin/post");
    },
  });

  const [image, setImage] = useState({ file: null, preview: post.image });

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .max(255)
      .required(),
    title: Yup.string().max(255).required(),
    description: Yup.string().max(255).required(),
    blogId: Yup.number().required().min(1, "Blog is required"),
    body: Yup.string().required(),
    image: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    let cloudImage;
    if (image.file) {
      cloudImage = await uploadCloudinary(image.file);
    }

    mutate({id:post.id, data:{...values, image:cloudImage}});
  };

  return (
    <>
      <Meta title={"Cập nhật bài viết | MISSOUT"} description="" />
      <AdminLayout>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="font-bold text-xl text-neutral">
                      Cập nhật bài viết
                    </h1>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Lưu
                    </button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mt-4 flex-col md:flex-row">
                      <div className="flex-1 space-y-4">
                        <div className="rounded bg-base-200 py-4 px-6 md:px-8">
                          <h2 className="text-md text-neutral font-bold border-b-2 pb-2">
                            Thông tin chung
                          </h2>
                          <div className="mt-4 space-y-4">
                            <div>
                              <label>
                                <span className="">Tiêu đề bài viết</span>
                                <Field
                                  type="text"
                                  name="title"
                                  placeholder="Nhập vào tiêu đề bài viết...."
                                  className="input input-bordered w-full mt-1"
                                />
                              </label>
                              <ErrorMessage
                                name="title"
                                component="div"
                                className="text-error"
                              />
                            </div>

                            <div>
                              <div className="flex gap-x-4">
                                <div className="flex-1">
                                  <span className="">Slug</span>
                                  <div className=" gap-1 mt-1 flex items-start">
                                    <label className="flex-1">
                                      <Field
                                        type="text"
                                        name="slug"
                                        placeholder="Nhập vào slug bài viết...."
                                        className="input input-bordered w-full"
                                      />
                                      <ErrorMessage
                                        name="slug"
                                        component="div"
                                        className="text-error"
                                      />
                                    </label>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() =>
                                        setFieldValue(
                                          "slug",
                                          generateSlug(values.title)
                                        )
                                      }
                                    >
                                      AUTO
                                    </button>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <label className="">
                                    <span className="">Danh mục</span>
                                    {blogs && (
                                      <Field
                                        as="select"
                                        name="blogId"
                                        className="input input-bordered w-full mt-1"
                                        onChange={(e) =>
                                          setFieldValue(
                                            "blogId",
                                            +e.target.value
                                          )
                                        }
                                      >
                                        <option value="0" disabled>
                                          Chọn
                                        </option>
                                        {blogs?.map((item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.title}
                                          </option>
                                        ))}
                                      </Field>
                                    )}
                                    <ErrorMessage
                                      name="blogId"
                                      component="div"
                                      className="text-error"
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label>
                                <span className="">Mô tả</span>
                                <Field
                                  as="textarea"
                                  name="description"
                                  placeholder="Nhập vào mô tả...."
                                  className="textarea textarea-bordered w-full mt-1 text-md"
                                />
                              </label>
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="text-error"
                              />
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="mb-1">Nội dung bài viết</h4>
                            <TranslationArea
                              initialContent={post.body}
                              onChange={(e) => {
                                setFieldValue("body", e);
                              }}
                            />
                            <ErrorMessage
                              name="body"
                              component="div"
                              className="text-error"
                            />
                          </div>
                        </div>
                        {/* Editor */}
                      </div>
                      <div className="py-4 px-6 md:px-8 w-full md:w-[350px] bg-base-200 rounded">
                        <h2>Ảnh chính</h2>
                        <label className="cursor-pointer">
                          <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              const preview = URL.createObjectURL(file);
                              setImage({ file: file, preview });
                              setFieldValue("image", preview);
                            }}
                          />
                          <ErrorMessage
                            name={`image`}
                            component="div"
                            className="text-error"
                          />
                          <div className="w-full border border-dotted-1 flex-col items-center mt-4 flex justify-center border-primary rounded">
                            <FcAddImage className="text-6xl" />
                            <span>Thêm ảnh</span>
                          </div>
                        </label>

                        {image.preview && (
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            <img src={image.preview} alt="" />
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </>
              </>
            )}
          </Formik>
          {isLoading && (
            <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.6)]">
              <SpinnerCenter />
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default UpdatePost;
export const getServerSideProps = async ({ params }) => {
  const slug = params.slug;
  const post = await PostApi.getPostBySlug(slug);
  return { props: { post: post } };
};
