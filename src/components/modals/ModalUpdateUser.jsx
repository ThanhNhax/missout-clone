import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import UserApi from "../../services/UserApi";

const ModalUpdateUser = ({ query, data, handleHidden }) => {
  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(UserApi.updateUser, {
    onSuccess: (response, variables) => {
      const oldUsers = queryClient.getQueryData(["users", query]);
      const newUsers = oldUsers.rows.map((item) => {
        return item.id === data.data.id
          ? { ...data.data, ...variables.payload }
          : item;
      });
      queryClient.setQueryData(["users", query], {
        ...oldUsers,
        rows: newUsers,
      });
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
    password: Yup.string().min(8),
    email: Yup.string().email().required(),
    role: Yup.string().oneOf(["user", "admin"]),
    isActive: Yup.boolean(),
    phone: Yup.string()
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Phone invalid format"
      )
      .nullable(),
    name: Yup.string(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const payload = { ...values };
    delete payload["id"];
    delete payload["email"];
    delete payload["createdAt"];

    for (const key in values) {
      if (key !== 'isActive' && !payload[key]) {
        delete payload[key];
      }
    }
    mutate({ id: values.id, payload });
  };

  return (
    <>
      {data.isDisplay && (
        <div className="modal opacity-100 visible pointer-events-auto">
          <div className="modal-box">
            <Formik
              initialValues={{
                ...data.data,
                email: data.data.email,
                phone: data.data.phone || "",
                name: data.data.name || "",
                date: data.data.date || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              innerRef={formikRef}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-bold text-lg">Cập nhật người dùng</h3>
                  <div className="mt-4 space-y-2">
                    <div>
                      <label htmlFor="" className="block">
                        Email
                      </label>
                      <Field
                        readOnly
                        name="email"
                        type="text"
                        placeholder="Nhập email..."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Ngày sinh
                      </label>
                      <Field
                        name="date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="date"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Tên
                      </label>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Nhập tên...."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Số điện thoại
                      </label>
                      <Field
                        name="phone"
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Mật khẩu
                      </label>
                      <Field
                        name="password"
                        type="text"
                        placeholder="Nhập mật khẩu..."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Loại người dùng
                      </label>
                      <Field
                        as="select"
                        name="role"
                        className="select mt-1 select-bordered w-full"
                      >
                        <option value={"user"}>Người dùng</option>
                        <option value={"admin"}>Admin</option>
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span>Hoạt động</span>
                          <Field
                            type="checkbox"
                            name="isActive"
                            className="checkbox"
                          />{" "}
                        </label>
                      </div>

                      <ErrorMessage
                        name="isActive"
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

export default ModalUpdateUser;
