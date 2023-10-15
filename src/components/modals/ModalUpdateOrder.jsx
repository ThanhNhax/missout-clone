import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import OrderApi from "../../services/OrderApi";
import { formatPrice } from "../../utils/formatPrice";

const ModalUpdateOrder = ({ data, handleHidden, query }) => {
  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(OrderApi.update, {
    onSuccess: (response, variables) => {
      const oldOrder = queryClient.getQueryData(
        ["orders", query],
        OrderApi.update
      );


      queryClient.setQueryData(
        ["orders", query],
       {...oldOrder, rows: oldOrder.rows.map((item) =>
        item.id === variables.id ? { ...item, ...variables.data } : item
      )}
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
    status: Yup.number().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {

    mutate({ id: values.id, data: {status:values.status} });
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
                  <h3 className="font-bold text-lg">Cập nhật đơn hàng</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <h4>Đơn hàng {data.data.id}</h4>
                        <h4>Tổng tiền: {formatPrice(data.data.total)}</h4>
                    </div>
                    <div>
                      <label htmlFor="" className="block">
                       Trạng thái
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="select mt-1 select-bordered w-full"
                      >
                        <option value={2}>Đã giao</option>
                        <option value={1}>Đang xử lý</option>
                        <option value={0}>Đã hủy</option>
                      </Field>
                      <ErrorMessage
                        name="status"
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

export default ModalUpdateOrder;
