import React, { useEffect, useRef } from "react";
import { ErrorMessage, Field, Form, useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "../../services/UserApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const ModalAddUser = ({ elementClick, query,limit }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(UserApi.addUser, {
    onSuccess: (data, variables) => {
      const oldUsers = queryClient.getQueryData(["users", query]);
      let popRows = [...oldUsers.rows];
      if(popRows.length >= limit){{
        popRows = oldUsers.rows.slice(0, -1);
      }}
     
      queryClient.setQueryData(["users", query], {
        ...oldUsers,
        rows: [data.data, ...popRows],
        count: oldUsers.count + 1,
      });
      toast.success("Tạo người dùng thành công");

      //Tắt modal
      checkRef.current.click();

      if (query && query.page != 1) {
        router.push({ query: {} });
      }

      //Reset form
      formikRef.current.resetForm();
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const initialValues = {
    email: "",
    password: "",
    role: "user",
    isActive: true,
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(8).required(),
    email: Yup.string().email().required(),
    role: Yup.string().oneOf(["user", "admin"]),
    isActive: Yup.boolean(),
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
                <h3 className="font-bold text-lg">Tạo người dùng</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Email
                    </label>
                    <Field
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

export default ModalAddUser;
