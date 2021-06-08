import React, { useState } from 'react';
import "../../../assets/scss/style.scss";
import { NavLink } from 'react-router-dom';
import Logo from "../../../assets/images/logos/Logo.ico";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signUp } from "../../../services/user-services";
import { Container, Accordion, Button, Spinner } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import "../validation.css";

export default function SignUp() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            acceptTerms: false
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            signUp(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success)
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "O nome deve ter no mínimo 3 caracteres!")
                .max(40, "O nome deve ter no máximo 40 caracteres!")
                .required("Informe seu nome!"),
            email: Yup.string()
                .email("Email inválido!")
                .required("Informe seu email!"),
            password: Yup.string()
                .matches("[a-z]", "A senha deve ter pelo menos uma letra minúscula")
                .matches("[A-Z]", "A senha deve ter pelo menos uma letra maiúscula")
                .matches("[0-9]", "A senha deve ter pelo menos um número")
                .min(8, "A senha deve ter no mínimo 8 caracteres!")
                .max(20, "A senha deve ter no máximo 20 caracteres!")
                .required("Informe uma senha!")
        })
    });

    const { addToast } = useToasts();

    const [showPassword, setShowPassword] = useState(false);
    const [showAccordion, setShowAccordion] = useState("1");
    const [passwordHaveLowerCase, setPasswordHaveLowerCase] = useState(false);
    const [passwordHaveUpperCase, setPasswordHaveUpperCase] = useState(false);
    const [passwordHaveNumber, setPasswordHaveNumber] = useState(false);
    const [passwordHaveLength, setPasswordHaveLength] = useState(false);
    const [passwordHaveIdealLength, setPasswordHaveIdealLength] = useState(false);

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
                            <h3 className="mb-4">Junte-se a nós</h3>
                            <form>

                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid" : formik.touched.name ? "is-valid" : ""}`}
                                        placeholder="Nome"
                                        onBlur={e => formik.setFieldValue("name", e.target.value.trim())}
                                        onFocus={() => formik.touched.name = true} />
                                    <div class="invalid-feedback text-left">
                                        {formik.errors.name}
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input
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
                                        name="password"
                                        className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : formik.touched.password ? "is-valid" : ""}`}
                                        placeholder="Senha"
                                        onFocus={() => setShowAccordion("0")}
                                        onChange={(e) => {
                                            formik.setFieldValue("password", e.target.value.trim());
                                            formik.touched.password = true;
                                            let passwordValue = e.target.value.trim();
                                            console.log(passwordValue)
                                            if (!/[a-z]/.test(passwordValue))
                                                setPasswordHaveLowerCase(false);
                                            else
                                                setPasswordHaveLowerCase(true);
                                            if (!/[A-Z]/.test(passwordValue))
                                                setPasswordHaveUpperCase(false);
                                            else
                                                setPasswordHaveUpperCase(true);
                                            if (!/[0-9]/.test(passwordValue))
                                                setPasswordHaveNumber(false);
                                            else
                                                setPasswordHaveNumber(true);
                                            if (passwordValue === "")
                                                setPasswordHaveLength(false);
                                            else
                                                setPasswordHaveLength(true);
                                            if (!(passwordValue.length > 7 && passwordValue.length < 41))
                                                setPasswordHaveIdealLength(false);
                                            else
                                                setPasswordHaveIdealLength(true);
                                        }}
                                        onBlur={() => setShowAccordion("1")} />
                                    <div class="input-group-append">
                                        <button class={`btn-outline-secondary fas ${showPassword ? "fa-eye-slash" : "fa-eye"} btn`} id="button-addon2" onClick={e => handleShowPassword(e)}></button>
                                    </div>
                                </div>

                                <Accordion activeKey={showAccordion}>
                                    <Accordion.Collapse eventKey="0">
                                        <Container style={{ textAlign: "left", marginBottom: 30 }}>
                                            <p>A senha deve conter:</p>
                                            <Container>
                                                <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveLowerCase ? "is-match" : "not-is-match"}`}>- Pelo menos uma letra minúscula;</p>
                                                <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveUpperCase ? "is-match" : "not-is-match"}`}>- Pelo menos uma letra maiúscula;</p>
                                                <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveNumber ? "is-match" : "not-is-match"}`}>- Pelo menos um número;</p>
                                                <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveIdealLength ? "is-match" : "not-is-match"}`}>- De 8 à 20 caracteres.</p>
                                            </Container>
                                        </Container>
                                    </Accordion.Collapse>
                                </Accordion>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" checked={formik.values.acceptTerms} onChange={() => formik.setFieldValue("acceptTerms", !formik.values.acceptTerms)} />
                                        <label htmlFor="checkbox-fill-2" className="cr">Aceito os <a href="#"> termos e condições</a> do sistema.</label>
                                    </div>
                                </div>
                                <Button className="btn btn-success shadow-2 mb-4" disabled={isLoading} onClick={(e) => {
                                    e.preventDefault();
                                    if (formik.values == formik.initialValues)
                                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                                    else if (formik.errors.password || formik.errors.name || formik.errors.email)
                                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                                    else if (!formik.values.acceptTerms)
                                        addToast("Você aceita os termos e condições do sistema?", { appearance: "error", autoDismiss: true });
                                    else
                                        formik.handleSubmit()
                                }}>{isLoading && <Spinner animation="border" variant="light" size="sm" />} Criar conta</Button>
                            </form>
                            <p className="mb-0 text-muted">Já tem uma conta? <NavLink to="/signin">Entre.</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}