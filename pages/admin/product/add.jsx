import React, { useEffect, useRef, useState } from "react";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import CategoryApi from "../../../src/services/CategoryApi";
import { generateSlug } from "../../../src/utils/generateSlug";
import { FcAddImage } from "react-icons/fc";
import ColorApi from "../../../src/services/ColorApi";
import SizeApi from "../../../src/services/SizeApi";
import uploadCloudinary from "../../../src/config/uploadCloudinary";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";
import productApi from "../../../src/services/ProductApi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ModalAddSize from "../../../src/components/modals/ModalAddSize";
import ModalAddColor from "../../../src/components/modals/ModalAddColor";

const AddProduct = () => {
  const { data: categories } = useQuery(["categories"], CategoryApi.getAll);
  const [previewImage, setPreviewImage] = useState([]);
  const [images, setImages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data: colors } = useQuery(["colors"], ColorApi.getAll);
  const { data: sizes } = useQuery(["sizes"], SizeApi.getAll);

  const [chooseSize, setChooseSize] = useState([]);
  const [chooseColor, setChooseColor] = useState([]);

  const router = useRouter();

  const { mutate } = useMutation(productApi.add, {
    onSuccess: (response) => {
      setIsLoading(false);
      toast.success("Tạo sản phẩm thành công");
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
    slug: "",
    name: "",
    description: "",
    categoryId: 0,
    variants: [],
    images: 0,
  };

  useEffect(() => {
    if (chooseColor.length > 0 || chooseSize.length > 0) {
      const newVariant = convertArray(chooseColor, chooseSize).map(
        (element) => ({
          ...element,
          quantity: 1,
          price: 1000,
        })
      );
      formikRef.current.setFieldValue("variants", newVariant);
    }
  }, [chooseColor, chooseSize]);

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .max(255)
      .required(),
    name: Yup.string().max(255).required(),
    description: Yup.string().required(),
    categoryId: Yup.number().required().min(1, "Category is required"),
    variants: Yup.array()
      .of(
        Yup.object()
          .shape({
            colorId: Yup.number().required("Color is required"),
            sizeId: Yup.number().required("Size is required"),
            quantity: Yup.number().required("Quantity is required"),
            price: Yup.number().required("Price is required"),
          })
          .required()
      )
      .min(1, "variant is a required field"),
    images: Yup.number().min(1, "image is a required field").required(),
  });

  function convertArray(colors, sizes) {
    const result = [];

    colors.forEach((color) => {
      sizes.forEach((size) => {
        result.push({
          colorId: color.id,
          colorName: color.name,
          sizeId: size.id,
          sizeName: size.name,
        });
      });
    });

    return result;
  }

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const cloudImages = await Promise.all(
      Array.from(images).map((item) => uploadCloudinary(item))
    );
    const payload = {
      ...values,
      description:values.description.replace('\n','<br/>'),
      images: cloudImages,
      variants: values.variants.map((item) => ({
        colorId: item.colorId,
        price: +item.price,
        quantity: +item.quantity,
        sizeId: item.sizeId,
      })),
    };

    mutate(payload);
  };

  return (
    <>
      <Meta title={"Tạo sản phẩm | MISSOUT"} description="" />
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
                    Tạo sản phẩm
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
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      setFieldValue(
                                        "slug",
                                        generateSlug(values.name)
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
                          <div className="flex gap-1">
                            <ModalAddSize
                              elementClick={
                                <div className="btn">Thêm Size</div>
                              }
                            />
                            <ModalAddColor
                              elementClick={
                                <div className="btn">Thêm Color</div>
                              }
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex gap-4">
                            <h2 className="w-[100px]">Kích thước</h2>
                            <div className="flex-1">
                              <div className="input flex items-center gap-[2px] input-bordered">
                                {chooseSize.length > 0 ? (
                                  <>
                                    {chooseSize.map((item) => (
                                      <div
                                        key={item.id}
                                        className="btn btn-primary btn-sm"
                                      >
                                        {item.name}
                                        <div
                                          onClick={() =>
                                            setChooseSize(
                                              chooseSize.filter(
                                                (element) =>
                                                  element.id !== item.id
                                              )
                                            )
                                          }
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <span>Thêm nhãn</span>
                                )}
                              </div>
                              <div className="mt-1 flex flex-wrap gap-[2px]">
                                {sizes?.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setChooseSize([
                                        ...chooseSize,
                                        { id: item.id, name: item.name },
                                      ]);
                                    }}
                                    disabled={chooseSize.some(
                                      (element) => element.id === item.id
                                    )}
                                    className="btn btn-primary btn-sm"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-4">
                            <h2 className="w-[100px]">Màu sắc</h2>
                            <div className="flex-1">
                              <div className="input flex items-center gap-[2px] input-bordered">
                                {chooseColor.length > 0 ? (
                                  <>
                                    {chooseColor.map((item) => (
                                      <div
                                        key={item.id}
                                        className="btn btn-primary btn-sm"
                                      >
                                        {item.name}
                                        <div
                                          onClick={() =>
                                            setChooseColor(
                                              chooseColor.filter(
                                                (element) =>
                                                  element.id !== item.id
                                              )
                                            )
                                          }
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"
                                            />
                                          </svg>
                                        </div>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <span>Thêm nhãn</span>
                                )}
                              </div>
                              <div className="mt-1 flex flex-wrap gap-[2px]">
                                {colors?.map((item) => (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      setChooseColor([
                                        ...chooseColor,
                                        { id: item.id, name: item.name },
                                      ]);
                                    }}
                                    disabled={chooseColor.some(
                                      (element) => element.id === item.id
                                    )}
                                    className="btn btn-primary btn-sm"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <ErrorMessage
                          name="variants"
                          component="div"
                          className="text-error"
                        />
                        <div className="mt-4 space-y-2">
                          <FieldArray>
                            <>
                              {" "}
                              {values.variants.length > 0 && (
                                <div className="flex items-center">
                                  <h4 className="w-[100px]">Phân loại</h4>
                                  <div className="grid flex-1 grid-cols-2 gap-2">
                                    <h4>Giá</h4>
                                    <h4>Số lượng</h4>
                                  </div>
                                </div>
                              )}
                              {values.variants.map((item, index) => (
                                <div className="flex items-center" key={index}>
                                  <h4 className="w-[100px]">{`${item.sizeName} / ${item.colorName}`}</h4>
                                  <div className="flex-1 grid grid-cols-2 gap-2">
                                    <div>
                                      <Field
                                        name={`variants[${index}].price`}
                                        type="number"
                                        onChange={(e) =>
                                          setFieldValue(
                                            `variants[${index}].price`,
                                            e.target.value || 0
                                          )
                                        }
                                        placeholder="Nhập giá..."
                                        className="input input-bordered w-full"
                                      />
                                      <ErrorMessage
                                        name={`variants[${index}].price`}
                                        component="div"
                                        className="text-error"
                                      />
                                    </div>
                                    <div>
                                      <Field
                                        name={`variants[${index}].quantity`}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `variants[${index}].quantity`,
                                            e.target.value || 0
                                          )
                                        }
                                        placeholder="Nhập số lượng..."
                                        type="number"
                                        className="input input-bordered w-full"
                                      />
                                      <ErrorMessage
                                        name={`variants[${index}].price`}
                                        component="div"
                                        className="text-error"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          </FieldArray>
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
      </AdminLayout>
    </>
  );
};

export default AddProduct;
