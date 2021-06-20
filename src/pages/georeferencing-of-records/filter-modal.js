import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";

export default function FilterModal({ ...props }) {

    const formik = useFormik({
        initialValues: {
            companyId: props.companyId,
            delivererName: "",
            dateLessThen: "",
            dateBiggerThen: "",
            type: "",
            accessKey: ""
        },
        onSubmit: async (values) => {
            let params = values;
            params.accessKey = values.accessKey?.replaceAll(".", "");
            props.listMarkers(params);
            props.setShow(false);
        }
    });

    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title>Filtrar</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Form>
                    <Form.Group>
                        <Form.Label>Data maior que</Form.Label>
                        <Form.Control type="date" name="dateBiggerThen" value={formik.values.dateBiggerThen} onChange={formik.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data menor que</Form.Label>
                        <Form.Control type="date" name="dateLessThen" value={formik.values.dateLessThen} onChange={formik.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nome do motorista</Form.Label>
                        <Form.Control type="text" name="delivererName" value={formik.values.delivererName} onChange={formik.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Chave de acesso</Form.Label>
                        <Form.Control type="text" value={formik.values.accessKey} name="accessKey" label="Chave de acesso" onChange={(e) => {
                            let text = e.target.value;
                            if (text.length > 54)
                                text = text.substring(0, 54)
                            if (!/[0-9]/.test(text[text.length - 1]))
                                text = text.substring(0, text.length - 1)
                            if (text.length === 4 || text.length === 9 || text.length === 14 || text.length === 19 || text.length === 24 || text.length === 29 || text.length === 34 || text.length === 39 || text.length === 44 || text.length === 49)
                                text += "."
                            e.target.value = text;
                            formik.setFieldValue("accessKey", text);
                        }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control size="sm" as="select" name="type" style={{ height: 42 }} value={formik.values.type} onChange={formik.handleChange}>
                            <option value="" selected>Todos</option>
                            <option value="Devoluções">Devoluções</option>
                            <option value="Entregas">Entregas</option>
                            <option value="Ocorrências">Ocorrências</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => props.setShow(false)}>
                    Sair
                </Button>
                <Button variant="success" onClick={formik.handleSubmit}>
                    Filtrar
                </Button>
            </Modal.Footer>
        </>
    );
}