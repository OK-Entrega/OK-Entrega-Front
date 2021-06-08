import React, {useState} from 'react';
import {Button, Container, Accordion, Spinner} from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import "../validation.css";
import Logo from "../../../assets/images/logos/Logo.ico";
import * as Yup from "yup";
import { useFormik } from "formik";
import {changePasswordForgotten} from "../../../services/user-services";

export default function ChangePassword() {
    const formik = useFormik({
        initialValues: {
            password: ""
        },
        onSubmit: async (values) => {
            values.token = window.location.href.split("/")[5];

            setIsLoading(true);
            changePasswordForgotten(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log(data)
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        setTimeout(() => {
                            window.location.href = "http://localhost:3000/signin";
                        }, 1000);
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
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
                            <h3 className="mb-4">Redefina sua senha</h3>
                            <form>

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
                                <Button className="btn btn-success shadow-2 mb-4" disabled={isLoading} onClick={(e) => {
                                    e.preventDefault();
                                    if (formik.values == formik.initialValues)
                                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                                    else if (formik.errors.password)
                                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                                    else
                                        formik.handleSubmit()
                                }}>{isLoading && <Spinner animation="border" variant="light" size="sm" />} Redefinir</Button>
                            </form>
                            <p className="mb-0 text-muted">Lembrou sua senha? <a href="/signin">Entre.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}