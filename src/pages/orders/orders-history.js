import React, { useState } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import GeneratePagination from '../../components/generate-pagination/generate-pagination';
import { Row, Col, Card, Container, Form, Accordion, Button, Modal, Spinner, InputGroup } from "react-bootstrap";
import { getFinished } from "../../services/order-services";
import BootstrapTable from 'react-bootstrap-table-next';
import { useFormik } from "formik";
import SeeOccurrencesModal from "./see-occurrences-modal";

const columns = [
    {
        dataField: 'type', //
        text: 'TIPO'
    },
    {
        dataField: 'receiver',
        text: 'DESTINATÁRIO|CNPJ'
    },
    {
        dataField: 'carrier',
        text: 'TRANSPORTADORA|CNPJ'
    },
    {
        dataField: "issuedAt",
        text: "DATA DE EMISSÃO"
    },
    {
        dataField: "dispatchedAt",
        text: "DATA DE DESPACHO"
    },
    {
        dataField: "finishedAt", //
        text: "DATA DE FINALIZAÇÃO"
    },
    {
        dataField: "documents", //
        text: "DOCUMENTOS"
    },
    {
        dataField: "vehicle",
        text: "VEÍCULO"
    },
    {
        dataField: "deliverer", //
        text: "MOTORISTA"
    },
    {
        dataField: "totalValue",
        text: "VALOR TOTAL"
    },
    {
        dataField: "weight",
        text: "PESO BRUTO"
    },
    {
        dataField: "accessKey",
        text: "CHAVE DE ACESSO"
    },
    {
        dataField: "occurrences",
        text: "OCORRÊNCIAS"
    },
    {
        dataField: "destinationCEP",
        text: "CEP"
    },
    {
        dataField: "destinationAddress",
        text: "LOGRADOURO"
    },
    {
        dataField: "destinationNumber",
        text: "NÚMERO"
    },
    {
        dataField: "destinationComplement",
        text: "COMPLEMENTO"
    },
    {
        dataField: "destinationDistrict",
        text: "BAIRRO"
    },
    {
        dataField: "destinationCity",
        text: "CIDADE"
    },
    {
        dataField: "destinationUF",
        text: "UF"
    }
];

export default function OrdersHistory() {

    const companyId = localStorage.getItem("companyId");

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/orders/history`

    const formik = useFormik({
        initialValues: {
            companyId: companyId,
            receiverCNPJ: "",
            type: "",
            receiverName: "",
            carrierCNPJ: "",
            carrierName: "",
            issuedAtLessThen: "",
            issuedAtBiggerThen: "",
            dispatchedAtLessThen: "",
            dispatchedAtBiggerThen: "",
            finishedAtLessThen: "",
            finishedAtBiggerThen: "",
            vehicleType: "",
            vehiclePlate: "",
            totalValueLessThen: "",
            totalValueBiggerThen: "",
            weightLessThen: "",
            weightBiggerThen: "",
            accessKey: "",
            destinationCEP: "",
            destinationAddress: "",
            destinationDistrict: "",
            destinationCity: "",
            destinationUF: "",
            destinationNumber: "",
            destinationComplement: "",
            delivererName: "",
            delivererCellphoneNumber: "",
            orderBy: "",
            descending: false,
            page: pageActive === undefined ? 1 : pageActive
        },
        onSubmit: async (values) => {
            let params = values;
            params.receiverCNPJ = values.receiverCNPJ?.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "");
            params.carrierCNPJ = values.carrierCNPJ?.replaceAll(".", "").replaceAll("-", "").replaceAll("/", "");
            if (values.vehicleType != null)
                params.vehicleType = values.vehicleType;
            else
                params.vehicleType = null;
            if (isNaN(values.totalValueBiggerThen))
                params.totalValueBiggerThen = Number(values.totalValueBiggerThen?.replaceAll(".", "").replaceAll(",", "."));
            if (isNaN(values.totalValueBiggerThen))
                params.totalValueLessThen = Number(values.totalValueLessThen?.replaceAll(".", "").replaceAll(",", "."));
            params.weightBiggerThen = Number(values.weightBiggerThen);
            params.weightLessThen = Number(values.weightLessThen);
            params.accessKey = values.accessKey?.replaceAll(".", "");
            params.destinationCEP = values.destinationCEP?.replaceAll("-", "");
            params.delivererCellphoneNumber.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "");

            list(params);
        }
    });

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const list = async (params) => {

        let queryString = encodeQueryData(params);

        getFinished(queryString)
            .then(response => response.json())
            .then(data => {
                if (data?.data?.pendingOrders)
                    data.data.pendingOrders.map(o => {
                        o.receiver = <p>{o.receiverName}<br></br>{o.receiverCNPJ}</p>
                        o.carrier = <p>{o.carrierName}<br></br>{o.carrierCNPJ}</p>
                        o.vehicle = <p>{o.vehicleType}<br></br>{o.vehiclePlate}</p>
                        let backup = o.occurrences;
                        o.occurrences = backup !== undefined && backup.length > 0 ? <a href="" onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setOccurrences(backup);
                        }}>Ver ocorrências</a> : <p>Nenhuma ocorrência</p>
                    })
                setData(data)
            });
    }

    const [show, setShow] = useState(false);
    const [pageActive, setPageActive] = useState(1);
    const [data, setData] = useState({});
    const [showAccordion, setShowAccordion] = useState(false);
    const [occurrences, setOccurrences] = useState({});

    return (
        <>
            <Header />
            <NavAside />
            <div className="pcoded-main-container">
                <div className="pcoded-wrapper">
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            <div className="main-body">
                                <div className="page-wrapper">
                                    <Row>
                                        <Col md={12}>
                                            <Modal show={show}><SeeOccurrencesModal setShow={setShow} occurrences={occurrences} /></Modal>
                                            <Card>
                                                <Card.Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Card.Title as="h5">Histórico de entregas</Card.Title>
                                                    <Button style={{ display: "flex", justifyContent: "center" }} onClick={() => setShowAccordion(!showAccordion)}><i class="fas fa-filter" style={{ margin: 0 }}></i></Button>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Accordion style={{ display: "flex", alignItems: "center", flexDirection: "column" }} activeKey={showAccordion ? "0" : "1"}>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Form style={{ margin: "10px 0 75px 0" }}>
                                                                <h5>Filtro</h5>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Tipo</Form.Label>
                                                                            <Form.Control size="sm" as="select" name="type" style={{ height: 42 }} onChange={formik.handleChange} value={formik.values.type}>
                                                                                <option value="" selected>Todos</option>
                                                                                <option value="Entregas">Entregas</option>
                                                                                <option value="Devoluções">Devoluções</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Destinatário</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Destinatário"
                                                                                name="receiverName"
                                                                                onChange={formik.handleChange}
                                                                                value={formik.values.receiverName}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>CNPJ Destinatário</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="CNPJ Destinatário"
                                                                                name="receiverCNPJ"
                                                                                onChange={(e) => {
                                                                                    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                                                                                    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
                                                                                    formik.setFieldValue("receiverCNPJ", e.target.value.trim());
                                                                                }}
                                                                                value={formik.values.receiverCNPJ}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Transportadora</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Transportadora"
                                                                                name="carrierName"
                                                                                onChange={formik.handleChange}
                                                                                value={formik.values.carrierName}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>CNPJ Transportadora</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="CNPJ Transportadora"
                                                                                name="carrierCNPJ"
                                                                                onChange={(e) => {
                                                                                    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                                                                                    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
                                                                                    formik.setFieldValue("carrierCNPJ", e.target.value.trim());
                                                                                }}
                                                                                value={formik.values.carrierCNPJ}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão maior que</Form.Label>
                                                                            <Form.Control type="date" name="issuedAtBiggerThen" value={formik.values.issuedAtBiggerThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão menor que</Form.Label>
                                                                            <Form.Control type="date" name="issuedAtLessThen" value={formik.values.issuedAtLessThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho maior que</Form.Label>
                                                                            <Form.Control type="date" name="dispatchedAtBiggerThen" value={formik.values.dispatchedAtBiggerThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho menor que</Form.Label>
                                                                            <Form.Control type="date" name="dispatchedAtLessThen" value={formik.values.dispatchedAtLessThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de finalização maior que</Form.Label>
                                                                            <Form.Control type="date" name="finishedAtBiggerThen" value={formik.values.finichedAtBiggerThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de finalização menor que</Form.Label>
                                                                            <Form.Control type="date" name="finishedAtLessThen" value={formik.values.finishedAtLessThen} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Tipo do veículo</Form.Label>
                                                                            <Form.Control size="sm" as="select" name="vehicleType" style={{ height: 42 }} onChange={formik.handleChange} value={formik.values.vehicleType}>
                                                                                <option value={5} selected>Todos</option>
                                                                                <option value={0}>Caminhão</option>
                                                                                <option value={1}>Furgão</option>
                                                                                <option value={2}>Moto</option>
                                                                                <option value={3}>Navio</option>
                                                                                <option value={4}>Outro</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Placa do veículo</Form.Label>
                                                                            <Form.Control type="text" name="vehiclePlate" value={formik.values.vehiclePlate} label="Placa do veículo" onChange={(e) => {
                                                                                e.target.value = e.target.value.toUpperCase();
                                                                                if (!/[A-Z]/.test(e.target.value[0]))
                                                                                    e.target.value = e.target.value.substring(0, 0);
                                                                                if (!/[A-Z]/.test(e.target.value[1]))
                                                                                    e.target.value = e.target.value.substring(0, 1);
                                                                                if (!/[A-Z]/.test(e.target.value[2]))
                                                                                    e.target.value = e.target.value.substring(0, 2);
                                                                                if (!/[0-9]/.test(e.target.value[3]))
                                                                                    e.target.value = e.target.value.substring(0, 3);
                                                                                if (!/[A-Z]/.test(e.target.value[4]))
                                                                                    e.target.value = e.target.value.substring(0, 4);
                                                                                if (!/[0-9]/.test(e.target.value[5]))
                                                                                    e.target.value = e.target.value.substring(0, 5);
                                                                                if (!/[0-9]/.test(e.target.value[6]))
                                                                                    e.target.value = e.target.value.substring(0, 6);
                                                                                if (e.target.value.length > 7)
                                                                                    e.target.value = e.target.value.substring(0, 7);
                                                                                formik.setFieldValue("vehiclePlate", e.target.value);
                                                                            }} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Valor total maior que</Form.Label>
                                                                            <InputGroup className="mb-2">
                                                                                <InputGroup.Prepend>
                                                                                    <InputGroup.Text>R$</InputGroup.Text>
                                                                                </InputGroup.Prepend>
                                                                                <Form.Control type="text" label="Valor total maior que" value={formik.values.totalValueBiggerThen} name="totalValueBiggerThen" onChange={(e) => {
                                                                                    // var v = e.target.value.replace(/\D/g, '');
                                                                                    // v = (v / 100).toFixed(2) + '';
                                                                                    // v = v.replace(".", ",");
                                                                                    // v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
                                                                                    // v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
                                                                                    // e.target.value = v;
                                                                                    formik.setFieldValue("totalValueBiggerThen", e.target.value);
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Valor total menor que</Form.Label>
                                                                            <InputGroup className="mb-2">
                                                                                <InputGroup.Prepend>
                                                                                    <InputGroup.Text>R$</InputGroup.Text>
                                                                                </InputGroup.Prepend>
                                                                                <Form.Control type="text" name="totalValueLessThen" label="Valor total menor que" value={formik.values.totalValueLessThen} onChange={(e) => {
                                                                                    // var v = e.target.value.replace(/\D/g, '');
                                                                                    // v = (v / 100).toFixed(2) + '';
                                                                                    // v = v.replace(".", ",");
                                                                                    // v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
                                                                                    // v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
                                                                                    // e.target.value = v;
                                                                                    formik.setFieldValue("totalValueLessThen", e.target.value);
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Peso bruto maior que</Form.Label>
                                                                            <InputGroup className="mb-2">
                                                                                <InputGroup.Prepend>
                                                                                    <InputGroup.Text>Kg</InputGroup.Text>
                                                                                </InputGroup.Prepend>
                                                                                <Form.Control type="text" name="weightBiggerThen" value={formik.values.weightBiggerThen} label="Peso bruto maior que" onChange={(e) => {
                                                                                    // var v = e.target.value, integer = v.split('.')[0];
                                                                                    // v = v.replace(/\D/, "");
                                                                                    // v = v.replace(/^[0]+/, "");

                                                                                    // if (v.length <= 3 || !integer) {
                                                                                    //     if (v.length === 1) v = '0.00' + v;
                                                                                    //     if (v.length === 2) v = '0.0' + v;
                                                                                    //     if (v.length === 3) v = '0.' + v;
                                                                                    // } else {
                                                                                    //     v = v.replace(/^(\d{1,})(\d{3})$/, "$1.$2");
                                                                                    // }

                                                                                    // e.target.value = v;
                                                                                    formik.setFieldValue("weightBiggerThen", e.target.value)
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Peso bruto menor que</Form.Label>
                                                                            <InputGroup className="mb-2">
                                                                                <InputGroup.Prepend>
                                                                                    <InputGroup.Text>Kg</InputGroup.Text>
                                                                                </InputGroup.Prepend>
                                                                                <Form.Control type="text" label="Peso bruto menor que" name="weightLessThen" value={formik.values.weightLessThen} onChange={(e) => {
                                                                                    // var v = e.target.value, integer = v.split('.')[0];
                                                                                    // v = v.replace(/\D/, "");
                                                                                    // v = v.replace(/^[0]+/, "");

                                                                                    // if (v.length <= 3 || !integer) {
                                                                                    //     if (v.length === 1) v = '0.00' + v;
                                                                                    //     if (v.length === 2) v = '0.0' + v;
                                                                                    //     if (v.length === 3) v = '0.' + v;
                                                                                    // } else {
                                                                                    //     v = v.replace(/^(\d{1,})(\d{3})$/, "$1.$2");
                                                                                    // }

                                                                                    // e.target.value = v;
                                                                                    formik.setFieldValue("weightLessThen", e.target.value);
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Chave de acesso</Form.Label>
                                                                            <Form.Control type="text" value={formik.values.accessKey} name="accessKey" label="Chave de acesso" style={{ width: 440 }} onChange={(e) => {
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
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>CEP</Form.Label>
                                                                            <Form.Control type="text" name="destinationCEP" value={formik.values.destinationCEP} label="CEP" onChange={(e) => {
                                                                                let text = e.target.value
                                                                                if (text.length > 9)
                                                                                    text = text.substring(0, 9)
                                                                                if (!/[0-9]/.test(text[text.length - 1]))
                                                                                    text = text.substring(0, text.length - 1)
                                                                                if (text.length === 5)
                                                                                    text += "-";
                                                                                e.target.value = text;
                                                                                formik.setFieldValue("destinationCEP", text);
                                                                            }} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Logradouro</Form.Label>
                                                                            <Form.Control type="text" label="Logradouro" name="destinationAddress" value={formik.values.destinationAddress} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Bairro</Form.Label>
                                                                            <Form.Control type="text" name="destinationDistrict" value={formik.values.destinationDistrict} label="Bairro" onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Cidade</Form.Label>
                                                                            <Form.Control type="text" label="Cidade" name="destinationCity" value={formik.values.destinationCity} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>UF</Form.Label>
                                                                            <Form.Control size="sm" as="select" value={formik.values.destinationUF} name="destinationUF" style={{ height: 42 }} onChange={formik.handleChange}>
                                                                                <option value={null}>Todas</option>
                                                                                <optgroup label="Região Sul">
                                                                                    <option value="PR">PR</option>
                                                                                    <option value="SC">SC</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Sudeste">
                                                                                    <option value="ES">ES</option>
                                                                                    <option value="MG">MG</option>
                                                                                    <option value="RJ">RJ</option>
                                                                                    <option value="SP">SP</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Centro-Oeste">
                                                                                    <option value="DF">DF</option>
                                                                                    <option value="GO">GO</option>
                                                                                    <option value="MT">MT</option>
                                                                                    <option value="MS">MS</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Nordeste">
                                                                                    <option value="AL">AL</option>
                                                                                    <option value="BA">BA</option>
                                                                                    <option value="CE">CE</option>
                                                                                    <option value="MA">MA</option>
                                                                                    <option value="PB">PB</option>
                                                                                    <option value="PE">PE</option>
                                                                                    <option value="PI">PI</option>
                                                                                    <option value="RN">RN</option>
                                                                                    <option value="SE">SE</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Norte">
                                                                                    <option value="AC">AC</option>
                                                                                    <option value="AM">AM</option>
                                                                                    <option value="AP">AP</option>
                                                                                    <option value="PA">PA</option>
                                                                                    <option value="RO">RO</option>
                                                                                    <option value="RR">RR</option>
                                                                                    <option value="TO">TO</option>
                                                                                </optgroup>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Número</Form.Label>
                                                                            <Form.Control type="text" label="Número" name="destinationNumber" value={formik.values.destinationNumber} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Complemento</Form.Label>
                                                                            <Form.Control type="text" label="Complemento" name="destinationComplement" value={formik.values.destinationComplement} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Motorista</Form.Label>
                                                                            <Form.Control type="text" label="Motorista" name="delivererName" value={formik.values.delivererName} onChange={formik.handleChange} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Número de celular</Form.Label>
                                                                            <InputGroup className="mb-2">
                                                                                <InputGroup.Prepend>
                                                                                    <InputGroup.Text>+55</InputGroup.Text>
                                                                                </InputGroup.Prepend>
                                                                                <Form.Control type="text" label="Número de celular" name="delivererCellphoneNumber" value={formik.values.delivererCellphoneNumber} onChange={(e) => {
                                                                                    var r = e.target.value.replace(/\D/g, "");
                                                                                    r = r.replace(/^0/, "");
                                                                                    if (r.length > 10) {
                                                                                        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
                                                                                    } else if (r.length > 5) {
                                                                                        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
                                                                                    } else if (r.length > 2) {
                                                                                        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
                                                                                    } else {
                                                                                        r = r.replace(/^(\d*)/, "($1");
                                                                                    }
                                                                                    formik.setFieldValue("delivererCellphoneNumber", r);
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Situação do canhoto</Form.Label>
                                                                            <Form.Control size="sm" as="select" name="orderBy" value={formik.values.orderBy} style={{ height: 42 }} onChange={formik.handleChange}>
                                                                                <option value="">Todos</option>
                                                                                <option value="Válidos">Válidos</option>
                                                                                <option value="Inválidos">Inválidos</option>
                                                                                <option value="Sem data">Sem data</option>
                                                                                <option value="Sem assinatura">Sem assinatura</option>
                                                                                <option value="Sem número e série">Sem número e série</option>
                                                                                <option value="Data inválida">Data inválida</option>
                                                                                <option value="Número e série inválidos">Número e série inválidos</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Ordenar por</Form.Label>
                                                                            <Form.Control size="sm" as="select" name="orderBy" value={formik.values.orderBy} style={{ height: 42 }} onChange={formik.handleChange}>
                                                                                <option value="">Data de criação</option>
                                                                                <option value="receiverName">Nome do destinatário</option>
                                                                                <option value="receiverCNPJ">CNPJ do destinatário</option>
                                                                                <option value="carrierName">Nome da transportadora</option>
                                                                                <option value="carrierCNPJ">CNPJ da transportadora</option>
                                                                                <option value="issuedAt">Data de emissão</option>
                                                                                <option value="dispatchedAt">Data de despacho</option>
                                                                                <option value="vehicleType">Tipo de veículo</option>
                                                                                <option value="vehiclePlate">Placa do veículo</option>
                                                                                <option value="totalValue">Valor total</option>
                                                                                <option value="weight">Peso bruto</option>
                                                                                <option value="accessKey">Chave de acesso</option>
                                                                                <option value="destinationCEP">CEP</option>
                                                                                <option value="destinationAddress">Logradouro</option>
                                                                                <option value="destinationDistrict">Bairro</option>
                                                                                <option value="destinationCity">Cidade</option>
                                                                                <option value="destinationUF">UF</option>
                                                                                <option value="destinationNumber">Número</option>
                                                                                <option value="destinationComplement">Complemento</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={2}>
                                                                        <div className="mb-3" style={{ marginTop: 29 }}>
                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="Ascendente"
                                                                                name="descending"
                                                                                value={formik.values.descending}
                                                                                onChange={(e) => formik.setFieldValue("descending", false)}
                                                                            />

                                                                            <Form.Check
                                                                                type="radio"
                                                                                label="Descendente"
                                                                                name="descending"
                                                                                value={formik.values.descending}
                                                                                onChange={(e) => formik.setFieldValue("descending", true)}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={3} style={{ marginTop: 29 }}>
                                                                        <Button variant="danger" style={{ height: 42 }} onClick={() => formik.resetForm()}><i class="fas fa-eraser" style={{ margin: 0 }}></i></Button>
                                                                        <Button variant="success" style={{ height: 42 }} onClick={() => formik.handleSubmit()}><i class="fas fa-search" style={{ margin: 0 }}></i></Button>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    {
                                                        data.data === undefined && data.statusCode === undefined
                                                            ?
                                                            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                                                <Spinner animation="border" variant="success" />
                                                            </Container>
                                                            :
                                                            data.statusCode === 404
                                                                ?
                                                                <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                                                    <div style={{ opacity: 0.5, textAlign: "center" }}>
                                                                        <i class="fas fa-truck" style={{ marginBottom: 10 }}></i>
                                                                        <h6>Nenhuma entrega finalizada!</h6>
                                                                    </div>
                                                                </Container>
                                                                :
                                                                <>
                                                                    <BootstrapTable keyField='id' data={data?.data?.pendingOrders} columns={columns} bordered={false} wrapperClasses="table-responsive" hover />
                                                                    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                                                                        <GeneratePagination pageCount={data?.data?.pageCount} setPageActive={setPageActive} pageActive={pageActive} />
                                                                    </div>
                                                                </>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}