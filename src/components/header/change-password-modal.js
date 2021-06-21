import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Accordion, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { changePassword } from "../../services/user-services";

export default function ChangePasswordModal({ ...props }) {

    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showAccordion, setShowAccordion] = useState("1");
    const [passwordHaveLowerCase, setPasswordHaveLowerCase] = useState(false);
    const [passwordHaveUpperCase, setPasswordHaveUpperCase] = useState(false);
    const [passwordHaveNumber, setPasswordHaveNumber] = useState(false);
    const [passwordHaveLength, setPasswordHaveLength] = useState(false);
    const [passwordHaveIdealLength, setPasswordHaveIdealLength] = useState(false);

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleShowCurrentPassword = (event) => {
        event.preventDefault();
        setShowCurrentPassword(!showCurrentPassword);
    }

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            changePassword(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        props.setShowChangePasswordModal(false);
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            currentPassword: Yup.string()
                .matches("[a-z]", "A senha deve ter pelo menos uma letra minúscula")
                .matches("[A-Z]", "A senha deve ter pelo menos uma letra maiúscula")
                .matches("[0-9]", "A senha deve ter pelo menos um número")
                .min(8, "A senha deve ter no mínimo 8 caracteres!")
                .max(20, "A senha deve ter no máximo 20 caracteres!")
                .required("Informe uma senha!"),
            newPassword: Yup.string()
                .matches("[a-z]", "A senha deve ter pelo menos uma letra minúscula")
                .matches("[A-Z]", "A senha deve ter pelo menos uma letra maiúscula")
                .matches("[0-9]", "A senha deve ter pelo menos um número")
                .min(8, "A senha deve ter no mínimo 8 caracteres!")
                .max(20, "A senha deve ter no máximo 20 caracteres!")
                .required("Informe uma senha!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowChangePasswordModal(false)}>
                <Modal.Title>Alterar senha</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <div className="input-group mb-4">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            name="currentPassword"
                            className={`form-control ${formik.errors.password && formik.touched.password ? "is-invalid" : formik.touched.password ? "is-valid" : ""}`}
                            placeholder="Senha atual"
                            onChange={(e) => {
                                formik.setFieldValue("currentPassword", e.target.value.trim());
                                formik.touched.currentPassword = true;
                            }} />
                        <div class="input-group-append">
                            <button class={`btn-outline-secondary fas ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"} btn`} id="button-addon2" onClick={e => handleShowCurrentPassword(e)}></button>
                        </div>
                    </div>

                    <div className="input-group mb-4">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            className={`form-control ${formik.errors.newPassword && formik.touched.newPassword ? "is-invalid" : formik.touched.newPassword ? "is-valid" : ""}`}
                            placeholder="Nova senha"
                            onFocus={() => setShowAccordion("0")}
                            onChange={(e) => {
                                formik.setFieldValue("newPassword", e.target.value.trim());
                                formik.touched.newPassword = true;
                                let passwordValue = e.target.value.trim();
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
                                <p>A nova senha deve conter:</p>
                                <Container>
                                    <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveLowerCase ? "is-match" : "not-is-match"}`}>- Pelo menos uma letra minúscula;</p>
                                    <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveUpperCase ? "is-match" : "not-is-match"}`}>- Pelo menos uma letra maiúscula;</p>
                                    <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveNumber ? "is-match" : "not-is-match"}`}>- Pelo menos um número;</p>
                                    <p className={`${!passwordHaveLength ? "not-is-match" : passwordHaveIdealLength ? "is-match" : "not-is-match"}`}>- De 8 à 20 caracteres.</p>
                                </Container>
                            </Container>
                        </Accordion.Collapse>
                    </Accordion>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowChangePasswordModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (formik.values == formik.initialValues)
                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.currentPassword || formik.errors.newPassword)
                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                    else
                        formik.handleSubmit();
                }}>
                    {isLoading && <Spinner animation="border" variant="light" size="sm" />} Alterar
                </Button>
            </Modal.Footer>
        </>
    );
}