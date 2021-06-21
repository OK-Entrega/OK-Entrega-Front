import React, { useEffect, useState } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import GeneratePagination from '../../components/generate-pagination/generate-pagination';
import { Row, Col, Card, Container, Form, Accordion, Button, FormFile, Spinner, InputGroup, Modal } from "react-bootstrap";
import { create, getPending, print, deleteMany } from "../../services/order-services";
import { useToasts } from "react-toast-notifications";
import BootstrapTable from 'react-bootstrap-table-next';
import { useFormik } from "formik";
import SeeOccurrencesModal from "./see-occurrences-modal";

const columns = [
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
        dataField: "vehicle",
        text: "VEÍCULO"
    },
    {
        dataField: "xmlPath",
        text: "XML"
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

export default function OrdersPending() {

    const companyId = localStorage.getItem("companyId");

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/orders/pending`

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const list = async (params) => {

        let queryString = encodeQueryData(params);

        getPending(queryString)
            .then(response => response.json())
            .then(data => {
                if (data?.data?.pendingOrders)
                    data.data.pendingOrders.map(o => {
                        o.xmlPath = <a href={o.xmlPath} download target="_blank">Visualizar</a>
                        o.receiver = <p>{o.receiverName}<br></br>{o.receiverCNPJ}</p>
                        o.carrier = <p>{o.carrierName}<br></br>{o.carrierCNPJ}</p>
                        o.vehicle = <p>{o.vehicleType}<br></br>{o.vehiclePlate}</p>
                        let backup = o.occurrences;
                        o.occurrences = backup !== undefined && backup.length > 0 ? <a href="" onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setOccurrences(backup);
                        }}>Visualizar</a> : <p>Nenhuma ocorrência</p>
                    })
                setData(data)
            });
    }

    const formik = useFormik({
        initialValues: {
            companyId: companyId,
            receiverCNPJ: "",
            receiverName: "",
            carrierCNPJ: "",
            carrierName: "",
            issuedAtLessThen: "",
            issuedAtBiggerThen: "",
            dispatchedAtLessThen: "",
            dispatchedAtBiggerThen: "",
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

            list(params);
        }
    });

    const [show, setShow] = useState(false);
    const [pageActive, setPageActive] = useState(1);
    const [ordersIds, setOrdersIds] = useState([]);
    const [data, setData] = useState({});
    const [occurrences, setOccurrences] = useState({});
    const [xmls, setXmls] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAccordion, setShowAccordion] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        list(formik.values);
    }, []);

    const handleOnSelect = (row, isSelect) => {
        if (isSelect)
            setOrdersIds([...ordersIds, row.id])
        else
            setOrdersIds(ordersIds.filter(i => i !== row.id));
    }

    const printOrders = (ids) => {
        let body;
        if (ids)
            body = { ordersIds: ids }
        else
            body = { ordersIds: ordersIds }
        print(body)
            .then(response => response.blob())
            .then(data => {
                var url = window.URL.createObjectURL(data);
                window.open(url);
            });
    }

    const deleteOrders = (ids) => {
        let body;
        if (ids)
            body = { ordersIds: ids }
        else
            body = { ordersIds: ordersIds }
        deleteMany(body)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    addToast(data.message, { appearance: "success", autoDismiss: true });
                    list({ companyId: companyId });
                }
                else
                    addToast(data.message, { appearance: "error", autoDismiss: true });
            });
        setOrdersIds([]);
    }

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
                                        <Col md={6}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Cadastro de entregas</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <h6>Faça o upload das XML's</h6>
                                                    <FormFile style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                                                        <Form.Label htmlFor="xml">
                                                            <span className="label text-white theme-bg f-12" style={{ cursor: "pointer", borderRadius: 50 }}><i class="fas fa-file-upload"></i> Selecionar arquivos</span>
                                                        </Form.Label>
                                                        <Form.File
                                                            multiple
                                                            id="xml"
                                                            custom
                                                            style={{ display: "none" }}
                                                            onChange={(e) => {
                                                                let files = [];
                                                                Array.from(e.target.files).map(f => {
                                                                    let obj = {
                                                                        file: f,
                                                                        id: createUUID()
                                                                    }
                                                                    files.push(obj)
                                                                })
                                                                setXmls(files)
                                                            }}
                                                            value={e => e.target.files}
                                                        />
                                                    </FormFile>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">XML's</Card.Title>
                                                </Card.Header>
                                                <Card.Body style={{ textAlign: "center" }}>
                                                    {
                                                        xmls === null || xmls.length < 1
                                                            ?
                                                            <div style={{ opacity: 0.5 }}>
                                                                <i class="fas fa-folder-open"></i>
                                                                <br></br>
                                                                Nenhum arquivo selecionado
                                                            </div>
                                                            :
                                                            <Container>
                                                                <Row>
                                                                    {
                                                                        Array.from(xmls).map((xml, index) => {
                                                                            return (
                                                                                <Col md={3} key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                                    <div style={{ display: "flex" }}>
                                                                                        <i class="fas fa-file-code" style={{ fontSize: 18, color: "black", marginRight: 4 }}></i>
                                                                                        <i class="fas fa-times" style={{ color: "red", cursor: "pointer" }} onClick={() => {
                                                                                            setXmls(xmls.filter(x => x.id !== xml.id));
                                                                                        }}></i>
                                                                                    </div>
                                                                                    <p>{xml.file.name}</p>
                                                                                </Col>
                                                                            );
                                                                        })
                                                                    }
                                                                </Row>
                                                                <Button variant="success" style={{ marginTop: 25 }} onClick={() => {
                                                                    let formData = new FormData();

                                                                    for (let i = 0; i < xmls.length; i++) {
                                                                        formData.append("files", xmls[i].file);
                                                                    }

                                                                    formData.append("companyId", String(localStorage.getItem("companyId")));

                                                                    setIsLoading(true);
                                                                    create(formData)
                                                                        .then(response => response.json())
                                                                        .then(data => {
                                                                            if (data.success) {
                                                                                addToast(data.message, { appearance: "success", autoDismiss: true });
                                                                                list({ companyId: companyId });
                                                                            }
                                                                            else
                                                                                addToast(data.message, { appearance: "error", autoDismiss: true });

                                                                            setIsLoading(false);
                                                                        })
                                                                }}>{isLoading && <Spinner animation="border" variant="light" size="sm" />} Criar entregas</Button>
                                                            </Container>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={12}>
                                            <Modal show={show}><SeeOccurrencesModal setShow={setShow} occurrences={occurrences} /></Modal>
                                            <Card>
                                                <Card.Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                    <Card.Title as="h5">Entregas pendentes</Card.Title>
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
                                                                        <h6>Nenhuma entrega para hoje!</h6>
                                                                    </div>
                                                                </Container>
                                                                :
                                                                <>
                                                                    <div style={{ display: "flex", marginBottom: 30 }}>
                                                                        <Button style={{ display: "flex", justifyContent: "center" }} onClick={() => {
                                                                            if (ordersIds !== undefined && ordersIds.length > 0)
                                                                                printOrders()
                                                                            else {
                                                                                var answer = window.confirm("Você não selecionou nenhuma entrega. Deseja mesmo imprimir todas?");
                                                                                if (answer) {
                                                                                    let ids = data.data.pendingOrders.map(p => p.id);
                                                                                    printOrders(ids);
                                                                                }
                                                                                else
                                                                                    printOrders();
                                                                            }
                                                                        }}><i class="fas fa-print" style={{ margin: 0 }}></i></Button>
                                                                        <Button style={{ display: "flex", justifyContent: "center" }} variant="danger" onClick={() => {
                                                                            if (ordersIds !== undefined && ordersIds.length > 0)
                                                                                deleteOrders()
                                                                            else {
                                                                                var answer = window.confirm("Você não selecionou nenhuma entrega. Deseja mesmo deletar todas?");
                                                                                if (answer) {
                                                                                    let ids = data.data.pendingOrders.map(p => p.id);
                                                                                    deleteOrders(ids);
                                                                                }
                                                                                else
                                                                                    deleteOrders();
                                                                            }
                                                                        }}><i class="fas fa-trash-alt" style={{ margin: 0 }}></i></Button>
                                                                    </div>
                                                                    <BootstrapTable keyField='id' data={data?.data?.pendingOrders} columns={columns} bordered={false}
                                                                        wrapperClasses="table-responsive" hover selectRow={{ mode: "checkbox", clickToSelect: true, onSelect: (row, isSelect) => handleOnSelect(row, isSelect) }} />
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