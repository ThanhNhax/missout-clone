import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import CategoryApi from "../../services/CategoryApi";

const ModalUpdateCategory = ({ data, handleHidden }) => {
  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(CategoryApi.update, {
    onSuccess: (response, variables) => {
      const oldCategories = queryClient.getQueryData(["categories"]);

      queryClient.setQueryData(
        ["categories"],
        oldCategories.map((item) =>
          item.id === variables.id ? { ...item, ...variables.data } : item
        )
      );
      toast.success("Cập nhật thành công");

      //Tắt modal
      handleHidden();

      //Reset form
      formikRef.current.resetForm();
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .required(),
    name: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { ...values };
    delete payload["id"];
    delete payload["createdAt"];
    delete payload['userId']

    if(values.slug === data.data.slug){
        delete payload['slug']
    }

    mutate({ id: values.id, data: payload });
  };

  return (
    <>
      {data.isDisplay && (
        <div className="modal opacity-100 visible pointer-events-auto">
          <div className="modal-box">
            <Formik
              initialValues={{
                ...data.data,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              innerRef={formikRef}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-bold text-lg">Cập nhật danh mục</h3>
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
                        name="name"
                        type="text"
                        placeholder="Nhập tên danh mục...."
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
                      <label onClick={handleHidden} className="btn">
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
      )}
    </>
  );
};

export default ModalUpdateCategory;
