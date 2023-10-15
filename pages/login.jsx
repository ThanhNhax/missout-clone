import React, { Suspense } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthApi from "../src/services/AuthApi";

export default function login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8).required(),
            email: Yup.string().email().required(),
        }),
        onSubmit: (values) => {
            // chỉ goi hàm bên services tự xử lý
            AuthApi.login(values);
        },
    });

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <div
                className="hero min-h-screen bg-base-200 bg-[url('https://file.hstatic.net/200000195489/file/banner_web-01_0b869214f97d45c7a17be4c203be93f7.jpg')] 
        bg-cover
        bg-center
        bg-no-repeat"
            >
                <div
                    className="hero-content flex-col lg:flex-row-reverse
              "
                >
                    <div
                        className=" text-center lg:text-left 
                               
                "
                    >
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form
                            className="card-body"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    className={
                                        formik.errors.email
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered "
                                    }
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    className={
                                        formik.errors.password
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered "
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
                            {(formik.touched.email && formik.errors.email) ||
                            (formik.touched.password &&
                                formik.errors.password) ? (
                                <p>
                                    {formik.errors.email ||
                                        formik.errors.password}
                                </p>
                            ) : null}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
