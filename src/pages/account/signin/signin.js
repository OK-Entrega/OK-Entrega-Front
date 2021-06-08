import React, { useState } from 'react';
import "../../../assets/scss/style.scss";
import { NavLink } from 'react-router-dom';
import Logo from "../../../assets/images/logos/Logo.ico";
import { Button, Spinner } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import { useFormik } from "formik";
import {signIn} from "../../../services/user-services";

export default function SignIn() {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            acceptTerms: false
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            signIn(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem("jwt", data.data);
                        window.location.href = "http://localhost:3000/my-companies";
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Email inválido!")
                .required("Informe seu email!"),
            password: Yup.string()
                .required("Informe uma senha!")
        })
    });

    const { addToast } = useToasts();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <img src={Logo} style={{ height: 50 }}></img>
                            </div>
                            <h3 className="mb-4">Entre com sua conta!</h3>
                            <form>
                                <div className="input-group mb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        className={`form-control ${formik.errors.email && formik.touched.email ? "is-invalid" : formik.touched.email ? "is-valid" : ""}`}
                                        placeholder="Email"
                                        onBlur={e => formik.setFieldValue("email", e.target.value.trim())}
                                        onFocus={() => formik.touched.email = true} />
                                    <div class="invalid-feedback text-left">
                                        {formik.errors.email}
                                    </div>
                                </div>
                                <div className="input-group mb-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha"
                                        name="password"
                                        className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : formik.touched.password ? "is-valid" : ""}`}
                                        placeholder="Senha"
                                        onChange={(e) => {
                                            formik.setFieldValue("password", e.target.value.trim());
                                            formik.touched.password = true;
                                        }
                                        }
                                    />
                                    <div class="input-group-append">
                                        <button class={`btn-outline-secondary fas ${showPassword ? "fa-eye-slash" : "fa-eye"} btn`} id="button-addon2" onClick={e => handleShowPassword(e)}></button>
                                    </div>
                                    <div class="invalid-feedback text-left">
                                        {formik.errors.password}
                                    </div>
                                </div>
                                <Button className="btn btn-success shadow-2 mb-4" disabled={isLoading} onClick={(e) => {
                                    e.preventDefault();
                                    if (formik.values == formik.initialValues)
                                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                                    else if (formik.errors.password || formik.errors.email)
                                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                                    else
                                        formik.handleSubmit()
                                }}>{isLoading && <Spinner animation="border" variant="light" size="sm" />} Entrar</Button>
                            </form>
                            <p className="mb-0 text-muted">Esqueceu sua senha? <NavLink to="/i-forgot-my-password/request-new-password">Clique aqui!</NavLink></p>
                            <p className="mb-0 text-muted">Não tem uma conta? <NavLink to="/signup">Crie uma!</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}