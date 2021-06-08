import React, { useState } from 'react';
import { Modal, Button, Form, FormFile, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { join } from "../../services/company-services";

export default function JoinInACompanyModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            code: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            join(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        props.setShow(false);
                        props.list();
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            code: Yup.string()
                .length(12, "O código deve conter 10 caracteres!")
                .required("Insira um código!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title>Entrar em empresa com código</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Código (apenas letras)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Código"
                            name="code"
                            className={`form-control ${formik.errors.code && formik.touched.code ? "is-invalid" : formik.touched.code ? "is-valid" : ""}`}
                            onBlur={e => formik.setFieldValue("code", e.target.value)}
                            onChange={e => {
                                if (/[0-9]/.test(e.target.value))
                                    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                                if (/[A-Z]/.test(e.target.value))
                                    e.target.value = e.target.value.substring(0, e.target.value.length - 1)
                                if (e.target.value.length > 12)
                                    e.target.value = e.target.value.substring(0, 12);
                                if (e.target.value.length === 3 || e.target.value.length === 8)
                                    e.target.value += "-"
                                return e.target.value;
                            }}
                            onFocus={() => formik.touched.code = true}
                        />
                        <div class="invalid-feedback text-left">
                            {formik.errors.code}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShow(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (formik.values == formik.initialValues)
                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.code)
                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                    else
                        formik.handleSubmit();
                }}>
                    {isLoading && <Spinner animation="border" variant="light" size="sm" />} Entrar
                </Button>
            </Modal.Footer>
        </>
    );
}