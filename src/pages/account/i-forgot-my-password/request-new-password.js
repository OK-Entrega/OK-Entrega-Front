import React, { useState } from 'react';
import { NavLink, Button, Spinner } from "react-bootstrap";
import Logo from "../../../assets/images/logos/Logo.ico";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { requestNewPassword } from "../../../services/user-services";

export default function RequestNewPassword() {

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);

            requestNewPassword(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
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
                .required("Informe seu email!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <img src={Logo} style={{ height: 50 }}></img>
                            </div>
                            <h3 className="mb-4">Solicite um link para redefinição de senha!</h3>
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
                                <Button className="btn btn-success shadow-2 mb-4" disabled={isLoading} onClick={(e) => {
                                    e.preventDefault();
                                    if (formik.values == formik.initialValues)
                                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                                    else if (formik.errors.password || formik.errors.email)
                                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                                    else
                                        formik.handleSubmit()
                                }}>{isLoading && <Spinner animation="border" variant="light" size="sm" />} Solicitar</Button>
                            </form>
                            <p className="mb-0 text-muted">Lembrou sua senha? <a href="/signin">Entre.</a></p>
                            <br></br><br></br>
                            <NavLink to="/"><i class="fas fa-home"></i> Voltar</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}