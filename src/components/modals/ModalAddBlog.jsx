import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import BlogApi from "../../services/BlogApi";

const ModalAddBlog = ({ elementClick }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(BlogApi.add, {
    onSuccess: (data, variables) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [data.data, ...oldBlogs]);
      toast.success("Tạo blog thành công");

      //Tắt modal
      checkRef.current.click();

      //Reset form
      formikRef.current.resetForm();
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const initialValues = {
    slug: "",
    title:""
  };

  const validationSchema = Yup.object({
    slug:Yup.string().matches(/^[a-zA-Z0-9-]+$/,"Invalid format slug").required(),
    title:Yup.string().required()
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values);
  };
  return (
    <>
      <label htmlFor="my_modal_6">{elementClick}</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg">Tạo danh mục</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Slug
                    </label>
                    <Field
                      name="slug"
                      type="text"
                      placeholder="Nhập slug..."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="slug"
                      component="div"
                      className="text-error"
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="block">
                      Tên danh mục
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Nhập tên danh mục.."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error"
                    />
                  </div>

                </div>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}

                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="my_modal_6" ref={checkRef} className="btn">
                      Đóng
                    </label>
                    {isLoading ? (
                      <div className="btn">
                        <span className="loading loading-spinner"></span>
                        loading
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddBlog;
