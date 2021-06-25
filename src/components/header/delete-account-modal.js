import React, { useState } from 'react';
import { Modal, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { deleteAccount } from "../../services/user-services";

export default function DeleteAccountModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        onSubmit: async (values) => {
            setIsLoading(true);

            deleteAccount(values)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        props.setShowDeleteAccountModal(false);
                        localStorage.removeItem("jwt");
                        window.location.href = window.location.href;
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
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
            <Modal.Header closeButton onClick={() => props.setShowDeleteAccountModal(false)}>
                <Modal.Title>Deletar conta</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <h6 style={{ textAlign: "center" }}>Tem certeza de que deseja excluir permanentemente sua conta? Todos os dados relacionados à ela, incluindo empresas e entregas também serão excluídos! <br></br><br></br>Dica: Para evitar a exclusão de empresas, primeiro, saia das empresas das quais você não quer que sejam excluídas.<br></br><br></br>Se deseja prosseguir, digite sua senha para garantir a autenticidade desta ação.</h6>
                <br></br><br></br>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowDeleteAccountModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (formik.values == formik.initialValues)
                        addToast("Preencha os campos!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.password || formik.errors.password)
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