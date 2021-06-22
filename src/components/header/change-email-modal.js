import React, { useRef, useState } from 'react';
import ReactDOM from "react-dom";
import { Modal, Button, Form, Spinner, Tabs, Tab, Container } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { requestNewEmail, changeEmail } from "../../services/user-services";

export default function ChangeEmailModal({ ...props }) {

    const [showAccordion, setShowAccordion] = useState("1");

    const formikChangeEmail = useFormik({
        initialValues: {
            digitOne: "",
            digitTwo: "",
            digitThree: "",
            digitFour: ""
        },
        validationSchema: Yup.object().shape({
            newEmail: Yup.string()
                .email("Email inválido!")
                .required("Informe seu email!")
        })
    });

    const formik = useFormik({
        initialValues: {
            newEmail: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);

            requestNewEmail(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        setKey("verifyEmail")
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            newEmail: Yup.string()
                .email("Email inválido!")
                .required("Informe seu email!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    const digitTwo = useRef();
    const digitThree = useRef();
    const digitFour = useRef();

    const [key, setKey] = useState("request");

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowChangeEmailModal(false)}>
                <Modal.Title>Alterar email</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <Tabs defaultActiveKey="request" id="uncontrolled-tab-example" activeKey={key}
                        onSelect={(k) => setKey(k)}>
                        <Tab eventKey="request" title="Inserir email">
                            <Form.Label>Insira o novo email</Form.Label>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    name="newEmail"
                                    className={`form-control ${formik.errors.newEmail && formik.touched.newEmail ? "is-invalid" : formik.touched.newEmail ? "is-valid" : ""}`}
                                    placeholder="Novo email"
                                    onBlur={e => formik.setFieldValue("newEmail", e.target.value.trim())}
                                    onFocus={() => formik.touched.newEmail = true} />

                                <div class="invalid-feedback text-left">
                                    {formik.errors.newEmail}
                                </div>
                            </div>
                            <Button variant="success" style={{ display: "block", margin: "auto" }} disabled={isLoading} onClick={() => {
                                if (formik.values == formik.initialValues)
                                    addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                                else if (formik.errors.newEmail)
                                    addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                                else
                                    formik.handleSubmit();
                            }}>
                                {isLoading && <Spinner animation="border" variant="light" size="sm" />} Enviar
                            </Button>
                        </Tab>
                        <Tab eventKey="verifyEmail" title="Verificar email">
                            <Form.Label>Insira o código de 4 dígitos para ativar seu email</Form.Label>
                            <Form.Group style={{ display: "flex", justifyContent: "space-between" }}>
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    name="digitOne"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (e.target.value.length === 2)
                                            value = value.substring(1, 2);
                                        if (value.length > 1)
                                            value = value.substring(0, value.length - 1);
                                        if (!/[0-9]/.test(value))
                                            value = value.substring(0, value.length - 1)
                                        if (value.length === 1 && /[0-9]/.test(value)) {
                                            formikChangeEmail.setFieldValue("digitOne", value);
                                            ReactDOM.findDOMNode(digitTwo.current).focus();
                                        }
                                    }}
                                    value={formikChangeEmail.values.digitOne}
                                    style={{ width: "20%" }}
                                />
                                <Form.Control
                                    ref={digitTwo}
                                    type="text"
                                    placeholder=""
                                    name="digitTwo"
                                    value={formikChangeEmail.values.digitTwo}
                                    style={{ width: "20%" }}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (e.target.value.length === 2)
                                            value = value.substring(1, 2);
                                        if (value.length > 1)
                                            value = value.substring(0, value.length - 1);
                                        if (!/[0-9]/.test(value))
                                            value = value.substring(0, value.length - 1)
                                        if (value.length === 1 && /[0-9]/.test(value)) {
                                            formikChangeEmail.setFieldValue("digitTwo", value);
                                            ReactDOM.findDOMNode(digitThree.current).focus();
                                        }
                                    }}
                                />
                                <Form.Control
                                    ref={digitThree}
                                    type="text"
                                    placeholder=""
                                    name="digitThree"
                                    value={formikChangeEmail.values.digitThree}
                                    style={{ width: "20%" }}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (e.target.value.length === 2)
                                            value = value.substring(1, 2);
                                        if (value.length > 1)
                                            value = value.substring(0, 1);
                                        if (!/[0-9]/.test(value))
                                            value = value.substring(0, value.length - 1)
                                        if (value.length === 1 && /[0-9]/.test(value)) {
                                            formikChangeEmail.setFieldValue("digitThree", value);
                                            ReactDOM.findDOMNode(digitFour.current).focus();
                                        }
                                    }}
                                />
                                <Form.Control
                                    ref={digitFour}
                                    type="text"
                                    placeholder=""
                                    name="digitFour"
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        if (e.target.value.length === 2)
                                            value = value.substring(1, 2);
                                        if (value.length > 1)
                                            value = value.substring(0, 1);
                                        if (!/[0-9]/.test(value))
                                            value = value.substring(0, value.length - 1)
                                        if (value.length === 1 && /[0-9]/.test(value)) {
                                            formikChangeEmail.setFieldValue("digitFour", value);
                                            setIsLoading(true);
                                            let data = formikChangeEmail.values;
                                            data = {
                                                code: data.digitOne + data.digitTwo + data.digitThree + value
                                            }
                                            changeEmail(data)
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.success) {
                                                        formikChangeEmail.resetForm();
                                                        addToast(data.message, { appearance: "success", autoDismiss: true });
                                                        props.setShowChangeEmailModal(false);
                                                        setTimeout(() => {
                                                            window.location.href = window.location.href
                                                        }, 500);
                                                    }
                                                    else
                                                        addToast(data.message, { appearance: "error", autoDismiss: true });

                                                    setIsLoading(false);
                                                });
                                        }
                                    }}
                                    value={formikChangeEmail.values.digitFour}
                                    style={{ width: "20%" }}
                                />
                            </Form.Group>
                            {
                                isLoading
                                &&
                                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                                    <Spinner animation="border" variant="success" />
                                </Container>
                            }
                        </Tab>
                    </Tabs>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowChangeEmailModal(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </>
    );
}