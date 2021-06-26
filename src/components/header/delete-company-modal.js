import React, { useState } from 'react';
import { Modal, Button, Spinner, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { deleteCompany } from "../../services/company-services";

export default function DeleteCompanyModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            cnpj: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);

            let params = {
                companyId: props.companyId,
                cnpj: values.cnpj
            }

            deleteCompany(params)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        props.setShowDeleteCompanyModal(false);
                        setTimeout(() => {
                            window.location.href = "http://localhost:3000/";
                        }, 500)
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            cnpj: Yup.string()
                .required("Informe o CNPJ da empresa!")
        })
    });

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowDeleteCompanyModal(false)}>
                <Modal.Title>Deletar empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <h6 style={{ textAlign: "center" }}>Tem certeza de que deseja excluir permanentemente esta empresa? Todas as entregas relacionadas à ela,  também serão excluídas! <br></br><br></br>Se deseja prosseguir, digite o CNPJ desta empresa para garantir a autenticidade desta ação.</h6>
                <br></br><br></br>
                <Form.Group>
                    <Form.Label>CNPJ (apenas números)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="CNPJ"
                        name="cnpj"
                        className={`form-control ${formik.errors.cnpj && formik.touched.cnpj ? "is-invalid" : formik.touched.cnpj ? "is-valid" : ""}`}
                        onBlur={e => formik.setFieldValue("cnpj", e.target.value)}
                        onChange={e => {
                            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                            e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
                            return e.target.value;
                        }}
                        onFocus={() => formik.touched.cnpj = true}
                    />
                    <div class="invalid-feedback text-left">
                        {formik.errors.cnpj}
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowDeleteCompanyModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (formik.values == formik.initialValues)
                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.cnpj)
                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                    else
                        formik.handleSubmit();
                }}>
                    {isLoading && <Spinner animation="border" variant="light" size="sm" />} Excluir
                </Button>
            </Modal.Footer>
        </>
    );
}