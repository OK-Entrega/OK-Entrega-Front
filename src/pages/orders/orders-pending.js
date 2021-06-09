import React, { useEffect, useState } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Container, Form, Accordion, Button, FormFile, Spinner, InputGroup } from "react-bootstrap";
import { create, getPending } from "../../services/order-services";
import { useToasts } from "react-toast-notifications";
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [
    {
        dataField: 'receiver',
        text: 'DESTINATÁRIO|CNPJ',
        sort: false
    }, 
    {
        dataField: 'carrier',
        text: 'TRANSPORTADORA|CNPJ',
        sort: true
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

        console.log(queryString)

        getPending(queryString)
            .then(response => response.json())
            .then(data => {
                data.data.pendingOrders.map(o => {
                    o.xmlPath = <a href={o.xmlPath} download target="_blank">Visualizar XML</a>
                    o.receiver = <p>{o.receiverName}<br></br>{o.receiverCNPJ}</p>
                    o.carrier = <p>{o.carrierName}<br></br>{o.carrierCNPJ}</p>
                    o.vehicle = <p>{o.vehicleType}<br></br>{o.vehiclePlate}</p>
                })
                setData(data)
            });
    }

    const [ordersIds, setOrdersIds] = useState([]);
    const [params, setParams] = useState(
        {
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
            page: 1
        }
    );
    const [data, setData] = useState({});
    const [xmls, setXmls] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAccordion, setShowAccordion] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        list(params);
    }, []);

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
                                                        xmls === null
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
                                                                                            let files = xmls;
                                                                                            files.splice(files.indexOf(files.find(f => f.id === xml.id)), 1)
                                                                                            setXmls(files);
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
                                                                                list();
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
                                                                            <Form.Label>Destinatário|CNPJ</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Destinatário|CNPJ"
                                                                                onChange={(e) => {
                                                                                    var text = e.target.value;

                                                                                    if (/[0-9]/.test(text)) {
                                                                                        var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                                                                                        e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');

                                                                                        params.receiverCNPJ = text.replaceAll("/", "").replaceAll(".", "").replaceAll("-", "");
                                                                                    }
                                                                                    else {
                                                                                        params.receiverName = text;
                                                                                        e.target.value = text;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Transportadora|CNPJ</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                placeholder="Transportadora|CNPJ"
                                                                                onChange={(e) => {
                                                                                    var text = e.target.value;

                                                                                    if (/[0-9]/.test(text)) {
                                                                                        var x = text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
                                                                                        e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
                                                                                        params.carrierCNPJ = text.replaceAll("/", "").replaceAll(".", "").replaceAll("-", "");
                                                                                    }
                                                                                    else {
                                                                                        params.carrierName = text;
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}></Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão maior que</Form.Label>
                                                                            <Form.Control type="date" onChange={(e) => params.issuedAtBiggerThen = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão menor que</Form.Label>
                                                                            <Form.Control type="date" onChange={(e) => params.issuedAtLessThen = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho maior que</Form.Label>
                                                                            <Form.Control type="date" onChange={(e) => params.dispatchedAtBiggerThen = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho menor que</Form.Label>
                                                                            <Form.Control type="date" onChange={(e) => params.dispatchedAtLessThen = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Tipo do veículo</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }} onChange={(e) => params.vehicleType = e.target.value}>
                                                                                <option value={null}>Todos</option>
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
                                                                            <Form.Control type="text" label="Placa do veículo" onChange={(e) => {
                                                                                e.target.value = e.target.value.toUpperCase();
                                                                                params.vehiclePlate = e.target.value;
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
                                                                                if (e.target.value.length > 6)
                                                                                    e.target.value = e.target.value.substring(0, 6);
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
                                                                                <Form.Control type="text" label="Valor total maior que" onChange={(e) => {
                                                                                    var v = e.target.value.replace(/\D/g, '');
                                                                                    v = (v / 100).toFixed(2) + '';
                                                                                    v = v.replace(".", ",");
                                                                                    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
                                                                                    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
                                                                                    e.target.value = v;
                                                                                    params.totalValueBiggerThen = e.target.value.replaceAll(",", "").replaceAll(".", "");
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
                                                                                <Form.Control type="text" label="Valor total menor que" onChange={(e) => {
                                                                                    var v = e.target.value.replace(/\D/g, '');
                                                                                    v = (v / 100).toFixed(2) + '';
                                                                                    v = v.replace(".", ",");
                                                                                    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
                                                                                    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
                                                                                    e.target.value = v;
                                                                                    params.totalValueLessThen = e.target.value.replaceAll(",", "").replaceAll(".", "");
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
                                                                                <Form.Control type="text" label="Peso bruto maior que" onChange={(e) => {
                                                                                    var v = e.target.value, integer = v.split('.')[0];
                                                                                    v = v.replace(/\D/, "");
                                                                                    v = v.replace(/^[0]+/, "");

                                                                                    if (v.length <= 3 || !integer) {
                                                                                        if (v.length === 1) v = '0.00' + v;
                                                                                        if (v.length === 2) v = '0.0' + v;
                                                                                        if (v.length === 3) v = '0.' + v;
                                                                                    } else {
                                                                                        v = v.replace(/^(\d{1,})(\d{3})$/, "$1.$2");
                                                                                    }

                                                                                    e.target.value = v;
                                                                                    params.weightBiggerThen = e.target.value.replaceAll(".", "");
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
                                                                                <Form.Control type="text" label="Peso bruto menor que" onChange={(e) => {
                                                                                    var v = e.target.value, integer = v.split('.')[0];
                                                                                    v = v.replace(/\D/, "");
                                                                                    v = v.replace(/^[0]+/, "");

                                                                                    if (v.length <= 3 || !integer) {
                                                                                        if (v.length === 1) v = '0.00' + v;
                                                                                        if (v.length === 2) v = '0.0' + v;
                                                                                        if (v.length === 3) v = '0.' + v;
                                                                                    } else {
                                                                                        v = v.replace(/^(\d{1,})(\d{3})$/, "$1.$2");
                                                                                    }

                                                                                    e.target.value = v;
                                                                                    params.weightLessThen = e.target.value.replaceAll(".", "");
                                                                                }} />
                                                                            </InputGroup>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Chave de acesso</Form.Label>
                                                                            <Form.Control type="text" label="Chave de acesso" style={{ width: 440 }} onChange={(e) => {
                                                                                let text = e.target.value;
                                                                                if (text.length > 54)
                                                                                    text = text.substring(0, 54)
                                                                                if (!/[0-9]/.test(text[text.length - 1]))
                                                                                    text = text.substring(0, text.length - 1)
                                                                                if (text.length === 4 || text.length === 9 || text.length === 14 || text.length === 19 || text.length === 24 || text.length === 29 || text.length === 34 || text.length === 39 || text.length === 44 || text.length === 49)
                                                                                    text += "."
                                                                                e.target.value = text;
                                                                                params.accessKey = text.replaceAll(".", "");
                                                                            }} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>CEP</Form.Label>
                                                                            <Form.Control type="text" label="CEP" onChange={(e) => {
                                                                                let text = e.target.value
                                                                                if (text.length > 9)
                                                                                    text = text.substring(0, 9)
                                                                                if (!/[0-9]/.test(text[text.length - 1]))
                                                                                    text = text.substring(0, text.length - 1)
                                                                                if (text.length === 5)
                                                                                    text += "-";
                                                                                e.target.value = text;
                                                                                params.destinationCEP = e.target.value.replaceAll("-", "");
                                                                            }} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Logradouro</Form.Label>
                                                                            <Form.Control type="text" label="Logradouro" onChange={(e) => params.destinationAddress = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Bairro</Form.Label>
                                                                            <Form.Control type="text" label="Bairro" onChange={(e) => params.destinationDistrict = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Cidade</Form.Label>
                                                                            <Form.Control type="text" label="Cidade" onChange={(e) => params.destinationCity = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>UF</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }} onChange={(e) => params.destinationUF = e.target.value}>
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
                                                                            <Form.Control type="text" label="Número" onChange={(e) => params.destinationNumber = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Complemento</Form.Label>
                                                                            <Form.Control type="text" label="Complemento" onChange={(e) => params.destinationComplement = e.target.value} />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3} style={{ marginTop: 29 }}>
                                                                        <Button variant="danger" style={{ height: 42 }}><i class="fas fa-eraser" style={{ margin: 0 }}></i></Button>
                                                                        <Button variant="success" style={{ height: 42 }}><i class="fas fa-search" style={{ margin: 0 }} onClick={() => list(params)}></i></Button>
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
                                                                <BootstrapTable keyField='id' data={data?.data?.pendingOrders} columns={columns} bordered={false}
                                                                    wrapperClasses="table-responsive" hover selectRow={{mode: "checkbox", clickToSelect: true}}/>
                                                        // <Table responsive className="table table-hover">
                                                        //     <thead>
                                                        //         <tr>
                                                        //             <th>
                                                        //                 <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" onClick={() => setOrdersIds(data.data?.pendingOrders?.map(o => o.id))} />
                                                        //             </th>
                                                        //             <th style={{ textAlign: "center" }} >Destinatário|CNPJ</th>
                                                        //             <th style={{ textAlign: "center" }}>Transportadora|CNPJ</th>
                                                        //             <th style={{ textAlign: "center" }}>Data de emissão</th>
                                                        //             <th style={{ textAlign: "center" }}>Data de despacho</th>
                                                        //             <th style={{ textAlign: "center" }}>Veículo</th>
                                                        //             <th style={{ textAlign: "center" }}>XML</th>
                                                        //             <th style={{ textAlign: "center" }}>Valor total</th>
                                                        //             <th style={{ textAlign: "center" }}>Peso bruto</th>
                                                        //             <th style={{ textAlign: "center" }}>Chave de acesso</th>
                                                        //             <th style={{ textAlign: "center" }}>CEP</th>
                                                        //             <th style={{ textAlign: "center" }}>Logradouro</th>
                                                        //             <th style={{ textAlign: "center" }}>Número</th>
                                                        //             <th style={{ textAlign: "center" }}>Complemento</th>
                                                        //             <th style={{ textAlign: "center" }}>Bairro</th>
                                                        //             <th style={{ textAlign: "center" }}>Cidade</th>
                                                        //             <th style={{ textAlign: "center" }}>UF</th>
                                                        //         </tr>
                                                        //     </thead>
                                                        //     <tbody>
                                                        //         {
                                                        //             data.data?.pendingOrders?.map((o, index) => {
                                                        //                 return (
                                                        //                     <tr key={index}>
                                                        //                         <td>
                                                        //                             <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" />
                                                        //                         </td>
                                                        //                         <td>
                                                        //                             {o.receiverName}
                                                        //                             <br></br>
                                                        //                             {o.receiverCNPJ}
                                                        //                         </td>
                                                        //                         <td>
                                                        //                             {o.carrierName}
                                                        //                             <br></br>
                                                        //                             {o.carrierCNPJ}
                                                        //                         </td>
                                                        //                         <td>{o.issuedAt}</td>
                                                        //                         <td>{o.dispatchedAt}</td>
                                                        //                         <td>
                                                        //                             {o.vehicleType}
                                                        //                             <br></br>
                                                        //                             {o.vehiclePlate}
                                                        //                         </td>
                                                        //                         <td><a href={o.xmlPath} download target="_blank">Visualizar XML</a></td>
                                                        //                         <td>{o.totalValue}</td>
                                                        //                         <td>{o.weight}</td>
                                                        //                         <td>{o.accessKey}</td>
                                                        //                         <td>{o.destinationCEP}</td>
                                                        //                         <td>{o.destinationAddress}</td>
                                                        //                         <td>{o.destinationNumber}</td>
                                                        //                         <td>{o.destinationComplement}</td>
                                                        //                         <td>{o.destinationDistrict}</td>
                                                        //                         <td>{o.destinationCity}</td>
                                                        //                         <td>{o.destinationUF}</td>
                                                        //                     </tr>
                                                        //                 );
                                                        //             })
                                                        //         }
                                                        //     </tbody>
                                                        // </Table>
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