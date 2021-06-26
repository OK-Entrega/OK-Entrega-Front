import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FormFile, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import { create, getDetails, edit } from "../../services/company-services";

export default function ChangeCompanyModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            name: name,
            cnpj: cnpj,
            segment: segment,
            deleteLogo: false
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            formData.append("name", name);
            formData.append("cnpj", cnpj);
            formData.append("segment", Number(segment));
            formData.append("logo", logo);
            formData.append("deleteLogo", deleteLogo);
            formData.append("companyId", props.companyId);

            setIsLoading(true);
            edit(formData)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        formik.resetForm();
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        setLogo(null);
                        setName(null)
                        setCNPJ(null)
                        setSegment(null)
                        setDeleteLogo(false)
                        props.setShowChangeCompanyModal(false);
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });

                    setIsLoading(false);
                });
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(3, "O nome deve ter no mínimo 3 caracteres!")
                .max(40, "O nome deve ter no máximo 40 caracteres!")
                .required("Informe um nome para a empresa!"),
            cnpj: Yup.string()
                .required("Informe o CNPJ da empresa!")
        })
    });

    useEffect(() => {
        getDetails(encodeQueryData({ companyId: props.companyId }))
            .then(response => response.json())
            .then(data => {
                setName(data.data.name)
                let formattedCnpj = data.data.cnpj.substring(0, 2) + "." + data.data.cnpj.substring(2, 5) + "." + data.data.cnpj.substring(5, 8) + "/" + data.data.cnpj.substring(8, 12) + "-" + data.data.cnpj.substring(12, 14)
                setCNPJ(formattedCnpj)
                setSegment(data.data.segment);
                setUrlLogo(data.data.urlLogo);
                formik.values.name = data.data.name;
                formik.values.cnpj = data.data.cnpj;
                formik.values.segment = data.data.segment
            });
    }, []);

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);
    const [logo, setLogo] = useState(null);
    const [urlLogo, setUrlLogo] = useState(null);
    const [name, setName] = useState("");
    const [cnpj, setCNPJ] = useState("");
    const [segment, setSegment] = useState(-1);
    const [deleteLogo, setDeleteLogo] = useState(false);

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowChangeCompanyModal(false)}>
                <Modal.Title>Editar empresa</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome"
                            name="name"
                            className={`form-control ${formik.errors.name && formik.touched.name ? "is-invalid" : formik.touched.name ? "is-valid" : ""}`}
                            onBlur={e => formik.setFieldValue("name", e.target.value.trim())}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => formik.touched.name = true}
                        />
                        <div class="invalid-feedback text-left">
                            {formik.errors.name}
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CNPJ (apenas números)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="CNPJ"
                            name="cnpj"
                            value={cnpj}
                            className={`form-control ${formik.errors.cnpj && formik.touched.cnpj ? "is-invalid" : formik.touched.cnpj ? "is-valid" : ""}`}
                            onBlur={e => formik.setFieldValue("cnpj", e.target.value)}
                            onChange={e => {
                                var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                                e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
                                setCNPJ(e.target.value);
                                return e.target.value;
                            }}
                            onFocus={() => formik.touched.cnpj = true}
                        />
                        <div class="invalid-feedback text-left">
                            {formik.errors.cnpj}
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Segmento</Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            name="segment"
                            style={{ height: 42 }}
                            value={segment}
                            onChange={(e) => {
                                formik.setFieldValue("segment", e.target.value)
                                setSegment(e.target.value)
                            }}
                        >
                            <option value={-1}>Selecione</option>
                            <option value={4}>Automobilismo</option>
                            <option value={2}>Comida e bebida</option>
                            <option value={1}>Finanças</option>
                            <option value={0}>Roupa e calçado</option>
                            <option value={3}>Saúde</option>
                            <option value={6}>Tecnologia</option>
                            <option value={5}>Venda e marketing</option>
                            <option value={7}>Outro</option>
                        </Form.Control>
                        <div class="invalid-feedback text-left">
                            {formik.errors.segment}
                        </div>
                    </Form.Group>
                    <FormFile style={{ display: "flex", justifyContent: "space-around" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Form.Label style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>Logo</Form.Label>
                            <Form.Label htmlFor="logo">
                                <span className="label text-white theme-bg f-12" style={{ cursor: "pointer", borderRadius: 50 }}><i class="fas fa-image"></i> Selecionar imagem</span>
                            </Form.Label>
                            <Form.File
                                id="logo"
                                custom
                                style={{ display: "none" }}
                                onChange={e => {
                                    setLogo(e.target.files[0])
                                    setUrlLogo(null);
                                    setDeleteLogo(false);
                                }}
                                value={e => e.target.files[0]}
                            />
                        </div>
                        <div style={{ width: 1.5, background: "#DDD" }}></div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {
                                logo !== null
                                    ?
                                    <>
                                        <Form.Label style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>Preview</Form.Label>
                                        <div style={{ display: "flex" }}>
                                            <img src={URL.createObjectURL(logo)} style={{ width: 30, borderRadius: 15 }}></img>
                                            <i class="fas fa-times" style={{ marginLeft: 2.5, color: "red", cursor: "pointer" }} onClick={() => {
                                                setLogo(null)
                                                setDeleteLogo(true)
                                            }}></i>
                                        </div>
                                    </>
                                    :
                                    urlLogo !== null
                                        ?
                                        <>
                                            <Form.Label style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>Preview</Form.Label>
                                            <div style={{ display: "flex" }}>
                                                <img src={urlLogo} style={{ width: 30, borderRadius: 15 }}></img>
                                                <i class="fas fa-times" style={{ marginLeft: 2.5, color: "red", cursor: "pointer" }} onClick={() => {
                                                    setUrlLogo(null)
                                                    setDeleteLogo(true)
                                                }}></i>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <i class="fas fa-image" style={{ marginTop: 20, marginBottom: 10, opacity: 0.5 }}></i>
                                            <p style={{ opacity: 0.5, textAlign: "center" }}>Nenhuma imagem<br></br> selecionada</p>
                                        </>
                            }
                        </div>
                    </FormFile>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShowChangeCompanyModal(false)}>
                    Fechar
                </Button>
                <Button variant="success" disabled={isLoading} onClick={() => {
                    if (Number(formik.values.segment) === -1)
                        addToast("Informe o segmento da sua empresa!", { appearance: "error", autoDismiss: true });
                    else if (formik.errors.cnpj || formik.errors.name)
                        addToast("Preencha os campos corretamente!", { appearance: "error", autoDismiss: true });
                    else
                        formik.handleSubmit();
                }}>
                    {isLoading && <Spinner animation="border" variant="light" size="sm" />} Salvar
                </Button>
            </Modal.Footer>
        </>
    );
}