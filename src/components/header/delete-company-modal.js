import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { changeUser } from "../../services/user-services";

export default function DeleteCompanyModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);

            changeUser(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        props.setShowChangeUserModal(false);
                        window.location.href = window.location.href;
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "O nome deve ter entre 3 à 40 caracteres!")
                .max(40, "O nome deve ter entre 3 à 40 caracteres!")
                .required("Informe um novo nome!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowDeleteCompanyModal(false)}>
                <Modal.Title>Alterar nome</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <Form.Label>Insira o novo nome</Form.Label>
                    <div className="input-group mb-3">
                        <input
                            type="email"
                            name="name"
                            className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid" : formik.touched.name ? "is-valid" : ""}`}
                            placeholder="Novo nome"
                            onChange={formik.handleChange} />

                        <div class="invalid-feedback text-left">
                            {formik.errors.name}
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowDeleteCompanyModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (formik.values == formik.initialValues)
                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.name)
                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                    else
                        formik.handleSubmit();
                }}>
                    {isLoading && <Spinner animation="border" variant="light" size="sm" />} Deletar
                </Button>
            </Modal.Footer>
        </>
    );
}