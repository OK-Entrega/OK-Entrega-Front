import React, { useEffect, useState } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Container, Form, Spinner, Button } from "react-bootstrap";
import { DonutChart } from "../../components/charts/charts";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useFormik } from "formik";
import { getFieldRecords } from '../../services/company-services';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1025
        },
        items: 1.5,
        partialVisibilityGutter: 40
    },
    laptop: {
        breakpoint: {
            max: 1024,
            min: 769
        },
        items: 1.1,
        partialVisibilityGutter: 40
    },
    tabletS: {
        breakpoint: {
            max: 500,
            min: 426
        },
        items: 0.4
    },
    tabletM: {
        breakpoint: {
            max: 650,
            min: 501
        },
        items: 0.7
    },
    tabletL: {
        breakpoint: {
            max: 768,
            min: 651
        },
        items: 0.9
    },
    mobileS: {
        breakpoint: {
            max: 320,
            min: 0
        },
        items: 0.1
    },
    mobileM: {
        breakpoint: {
            max: 375,
            min: 321
        },
        items: 0.2
    },
    mobileL: {
        breakpoint: {
            max: 425,
            min: 376
        },
        items: 0.2
    }
}

export default function Records() {

    const companyId = localStorage.getItem("companyId");

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/records`

    const list = (params) => {
        getFieldRecords(encodeQueryData(params))
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
    }

    const [data, setData] = useState({});

    const formik = useFormik({
        initialValues: {
            companyId: companyId,
            date: `${("0" + (new Date().getDate())).slice(-2)}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${new Date().getFullYear()}`,
            delivererName: "",
            type: ""
        },
        onSubmit: async (values) => {
            setData({});
            list(values);
        }
    });

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    useEffect(() => {
        list({ companyId: companyId });
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
                                        <Col md={7}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Registros</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Container>
                                                        <Form>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Form.Group style={{ width: "auto" }}>
                                                                        <Form.Label>Selecionar data</Form.Label>
                                                                        <Form.Control type="date" style={{ height: 42 }} name="date" value={formik.values.date} onChange={formik.handleChange} />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group style={{ width: "auto" }}>
                                                                        <Form.Label>Tipo</Form.Label>
                                                                        <Form.Control size="sm" as="select" style={{ height: 42 }} name="type" value={formik.values.type} onChange={formik.handleChange}>
                                                                            <option value="">Todos</option>
                                                                            <option value="Entregas">Entregas</option>
                                                                            <option value="Devoluções">Devoluções</option>
                                                                            <option value="Sem ocorrências">Sem ocorrências</option>
                                                                            <option value="Com ocorrências">Com ocorrências</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group style={{ width: "auto" }}>
                                                                        <Form.Label>Nome do motorista</Form.Label>
                                                                        <Form.Control type="text" placeholder="Nome do motorista" name="delivererName" value={formik.values.delivererName} onChange={formik.handleChange}></Form.Control>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={3} style={{ marginTop: 29 }}>
                                                                    <Button variant="success" style={{ height: 42 }} onClick={() => formik.handleSubmit()}><i class="fas fa-search" style={{ margin: 0 }}></i></Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                    </Container>
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
                                                                        <i class="fas fa-user" style={{ marginBottom: 10 }}></i>
                                                                        <h6>Nada para mostrar por aqui!</h6>
                                                                    </div>
                                                                </Container>
                                                                :
                                                                <Carousel minimumTouchDrag={0} responsive={responsive} draggable={false}>
                                                                    {
                                                                        data.data?.deliverers?.map((d, index) => {
                                                                            return <Card key={index} style={{ width: '18rem', margin: 50, background: "white", border: "solid 1px #CCCCCC", borderRadius: 5 }}>
                                                                                <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                        <div className="bg-secondary" style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                            <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>{d.delivererName.substring(0, 1).toUpperCase()}</p>
                                                                                        </div>
                                                                                        <p style={{ margin: "0 20px" }}>{d.delivererName}</p>
                                                                                    </div>
                                                                                    <div style={{ display: "flex", marginTop: 20 }}>
                                                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                            <div style={{ width: 20, height: 5, borderRadius: 5, background: "#2ECC70" }}></div>
                                                                                            <p style={{ margin: "0 10px" }}>{d.finishedsWithSuccess}</p>
                                                                                        </div>
                                                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                            <div style={{ width: 20, height: 5, borderRadius: 5, background: "red" }}></div>
                                                                                            <p style={{ margin: "0 10px" }}>{d.finishedsWithDevolution}</p>
                                                                                        </div>
                                                                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                                            <div style={{ width: 20, height: 5, borderRadius: 5, background: "#FEA520" }}></div>
                                                                                            <p style={{ margin: "0 10px" }}>{d.occurrences}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </Card.Body>
                                                                            </Card>
                                                                        })
                                                                    }
                                                                </Carousel>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={5}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Visão geral</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
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
                                                                        <i class="feather icon-pie-chart" style={{ marginBottom: 10, fontSize: 17 }}></i>
                                                                        <h6>Impossível gerar o gráfico sem dados!</h6>
                                                                    </div>
                                                                </Container>
                                                                :
                                                                <div style={{ height: 300 }}>
                                                                    <DonutChart data={data.data?.graph} />
                                                                </div>
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