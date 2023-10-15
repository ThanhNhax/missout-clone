import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import AuthApi from "../src/services/AuthApi";

export default function register() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            re_password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8).required(),
            email: Yup.string().email().required(),
            re_password: Yup.string().oneOf([Yup.ref("password"), null]),
        }),
        onSubmit: (values) => {
            // chỉ goi hàm bên services tự xử lý
            console.log(values);
            AuthApi.register(values);
        },
    });

    return (
        <div className="hero min-h-screen bg-[url('https://file.hstatic.net/200000195489/file/banner_web-01_0b869214f97d45c7a17be4c203be93f7.jpg')]">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                >
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                className={
                                    formik.errors.email
                                        ? "input input-bordered input-error  w-full max-w-xs"
                                        : "input input-bordered"
                                }
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={
                                    formik.errors.password
                                        ? "input input-bordered input-error  w-full max-w-xs"
                                        : "input input-bordered"
                                }
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Re-enter password
                                </span>
                            </label>
                            <input
                                name="re_password"
                                type="password"
                                placeholder="Re-enter password"
                                className={
                                    formik.errors.re_password
                                        ? "input input-bordered input-error  w-full max-w-xs"
                                        : "input input-bordered"
                                }
                                onChange={formik.handleChange}
                            />
                            <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
