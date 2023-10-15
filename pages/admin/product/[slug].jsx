import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import * as Yup from "yup";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";
import uploadCloudinary from "../../../src/config/uploadCloudinary";
import CategoryApi from "../../../src/services/CategoryApi";
import productApi from "../../../src/services/ProductApi";
import { formatPrice } from "../../../src/utils/formatPrice";
import { generateSlug } from "../../../src/utils/generateSlug";
import ModalUpdateVariant from "../../../src/components/modals/ModalUpdateVariant";

const UpdateProduct = ({ productDetail }) => {
  const { data: categories } = useQuery(["categories"], CategoryApi.getAll);

  const [product, setProduct] = useState(productDetail)

  const [previewImage, setPreviewImage] = useState(
    productDetail.ProductImages.map((item) => item.src)
  );
  const [images, setImages] = useState();

  const [currentUpdate, setCurrenUpdate] = useState({isDisplay:false, data:{}})

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const { mutate } = useMutation(productApi.update, {
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("Cập nhật sản phẩm thành công");
      router.push("/admin/product");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
      setIsLoading(false);
      router.push("/admin/product");
    },
  });

  const formikRef = useRef(null);

  const initialValues = {
    slug: product.slug,
    name: product.name,
    description: product.description.replace("<br/>", "\n"),
    categoryId: product.categoryId,
    images: product.ProductImages.length,
  };

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .max(255)
      .required(),
    name: Yup.string().max(255).required(),
    description: Yup.string().required(),
    categoryId: Yup.number().required().min(1, "Category is required"),
    images: Yup.number().min(1, "image is a required field").required(),
  });

  const handleSubmit = async (values) => {
    let cloudImages;
    if (images) {
      setIsLoading(true)
      cloudImages = await Promise.all(
        Array.from(images).map((item) => uploadCloudinary(item))
      );
    }

    const payload = {
      ...values,
      category:values.categoryId,
      images: cloudImages,
      description:values.description.replace('\n','<br/>')
    };

    delete payload['categoryId']
     
    mutate({id:product.id, data:payload})
  };

  const handleUpdateVariant = ({id, data}) => {
    setProduct({...product, variants:product.variants.map(item => item.id === id ? {...item, ...data} : item)})
  }

  return (
    <>
      <Meta title={"Cập nhật sản phẩm | MISSOUT"} description="" />
      <AdminLayout>
        <div className="relative">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <div className="flex items-center justify-between">
                  <h1 className="font-bold text-xl text-neutral">
                    Cập nhật sản phẩm
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
                              <span className="">Tên sản phẩm</span>
                              <Field
                                type="text"
                                name="name"
                                placeholder="Nhập vào tên sản phẩm...."
                                className="input input-bordered w-full mt-1"
                              />
                            </label>
                            <ErrorMessage
                              name="name"
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
                                      placeholder="Nhập vào slug sản phẩm...."
                                      className="input input-bordered w-full"
                                    />
                                    <ErrorMessage
                                      name="slug"
                                      component="div"
                                      className="text-error"
                                    />
                                  </label>
                                  <div
                                    className="btn btn-primary"
                                    onClick={() =>
                                      setFieldValue(
                                        "slug",
                                        generateSlug(values.name)
                                      )
                                    }
                                  >
                                    AUTO
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1">
                                <label className="">
                                  <span className="">Danh mục</span>
                                  {categories && (
                                    <Field
                                      as="select"
                                      name="categoryId"
                                      className="input input-bordered w-full mt-1"
                                      onChange={(e) =>
                                        setFieldValue(
                                          "categoryId",
                                          +e.target.value
                                        )
                                      }
                                    >
                                      <option value="0" disabled>
                                        Chọn
                                      </option>
                                      {categories?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Field>
                                  )}
                                  <ErrorMessage
                                    name="categoryId"
                                    component="div"
                                    className="text-error"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label>
                              <span className="">Mô tả sản phẩm</span>
                              <Field
                                as="textarea"
                                name="description"
                                placeholder="Nhập vào mô tả sản phẩm...."
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
                      </div>
                      <div className="rounded bg-base-200 py-4 px-6 md:px-8">
                        <div className="flex justify-between items-center">
                          <h1 className="text-md text-neutral font-bold border-b-2 pb-2">
                            Biến thể
                          </h1>
                        </div>

                        <div className="mt-4 space-y-2">
                          <>
                            {" "}
                            {product.variants.length > 0 && (
                              <div className="flex items-center">
                                <div className="grid flex-1 grid-cols-4 gap-2">
                                  <h4>Phân loại</h4>

                                  <h4>Giá</h4>
                                  <h4>Số lượng</h4>
                                  <h4>Hành động</h4>
                                </div>
                              </div>
                            )}
                            {product.variants.map((item, index) => (
                              <div className="flex items-center" key={index}>
                                <div className="flex-1 grid grid-cols-4 gap-2">
                                  <h4>{`${item.Size.name} / ${item.Color.name}`}</h4>
                                  <h4>{formatPrice(item.price)}</h4>
                                  <h4>{item.quantity}</h4>
                                  <div onClick={() => setCurrenUpdate({isDisplay:true, data:item})} className="btn btn-sm w-[100px] btn-primary">
                                    Cập nhật
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        </div>
                      </div>
                    </div>
                    <div className="py-4 px-6 md:px-8 w-full md:w-[350px] bg-base-200 rounded">
                      <h2>Hình ảnh sản phẩm</h2>
                      <label className="cursor-pointer">
                        <input
                          className="hidden"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            setImages(files);
                            const previews = [];
                            for (let i = 0; i < files.length; i++) {
                              previews.push(URL.createObjectURL(files[i]));
                            }

                            setPreviewImage(previews);
                            if (previews.length > 0) {
                              setFieldValue("images", previews.length);
                            }
                          }}
                        />
                        <ErrorMessage
                          name={`images`}
                          component="div"
                          className="text-error"
                        />
                        <div className="w-full border border-dotted-1 flex-col items-center mt-4 flex justify-center border-primary rounded">
                          <FcAddImage className="text-6xl" />
                          <span>Thêm ảnh</span>
                        </div>
                      </label>

                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {previewImage.map((item, index) => (
                          <img key={index} src={item} alt="" />
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </Formik>
          {isLoading && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)]">
              <SpinnerCenter />
            </div>
          )}
        </div>
        <ModalUpdateVariant data={currentUpdate} handleUpdate={handleUpdateVariant} handleHidden={() => setCurrenUpdate({isDisplay:false, data:{}})}/>
      </AdminLayout>
    </>
  );
};

export default UpdateProduct;

export const getServerSideProps = async ({ params }) => {
  const slug = params.slug;
  const product = await productApi.getProductBySlug(slug);
  return { props: { productDetail:product } };
};
