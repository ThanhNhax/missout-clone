import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import CategoryApi from "../../services/CategoryApi";
import VariantApi from "../../services/VariantApi";

const ModalUpdateVariant = ({ data, handleHidden, handleUpdate }) => {

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(VariantApi.update, {
    onSuccess: (response, variables) => {
      handleUpdate(variables);

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
    quantity: Yup.number().required("Quantity is required"),
    price: Yup.number().required("Price is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate({id:values.id, data:{
        quantity:values.quantity,
        price:values.price
    }})
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
                  <h3 className="font-bold text-lg">Cập nhật biến thể</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <h4>Phân loại</h4>
                      <h4>{`${data.data.Size.name} / ${data.data.Color.name}`}</h4>
                    </div>
                    <div>
                      <label htmlFor="" className="block">
                        Giá
                      </label>
                      <Field
                        name="price"
                        type="number"
                        placeholder="Nhập giá..."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Số lượng
                      </label>
                      <Field
                        name="quantity"
                        type="number"
                        placeholder="Nhập số lượng...."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="quantity"
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

export default ModalUpdateVariant;
