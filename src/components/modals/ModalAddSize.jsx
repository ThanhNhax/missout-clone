import React, { useEffect, useRef } from "react";
import { ErrorMessage, Field, Form, useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import CategoryApi from "../../services/CategoryApi";
import SizeApi from "../../services/SizeApi";

const ModalAddSize = ({ elementClick }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(SizeApi.add, {
    onSuccess: (data, variables) => {
      const oldSizes = queryClient.getQueryData(["sizes"]);
      queryClient.setQueryData(["sizes"], [data.data,...oldSizes]);
      toast.success("Tạo size thành công");

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
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values);
  };
  return (
    <>
      <label htmlFor="my_modal_size">{elementClick}</label>

      <input type="checkbox" id="my_modal_size" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit }) => (
              <div>
                <h3 className="font-bold text-lg">Tạo size</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Size
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Nhập size.."
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
                    <label htmlFor="my_modal_size" ref={checkRef} className="btn">
                      Đóng
                    </label>
                    {isLoading ? (
                      <div className="btn">
                        <span className="loading loading-spinner"></span>
                        loading
                      </div>
                    ) : (
                      <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddSize;
