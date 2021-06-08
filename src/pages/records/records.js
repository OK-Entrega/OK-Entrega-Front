import React from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Container, Form } from "react-bootstrap";
import { DonutChart } from "../../components/charts/charts";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
                                                        <Form style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 20 }}>
                                                            <Form.Group style={{ width: "auto" }}>
                                                                <Form.Label>Selecionar data</Form.Label>
                                                                <Form.Control type="date" style={{ height: 42 }} />
                                                            </Form.Group>
                                                            <Form.Group style={{ width: "auto", marginLeft: 10 }}>
                                                                <Form.Label>Tipo</Form.Label>
                                                                <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                    <option>Entrega</option>
                                                                    <option>Devolução</option>
                                                                    <option>Ocorrência</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form>
                                                    </Container>
                                                    <Carousel minimumTouchDrag={0} responsive={responsive} draggable={false}>
                                                        <Card style={{ width: '18rem', margin: 50, background: "white", border: "solid 1px #CCCCCC", borderRadius: 5 }}>
                                                            <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <div className="bg-secondary" style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>D</p>
                                                                    </div>
                                                                    <p style={{ margin: "0 20px" }}>Pedro da Cunha</p>
                                                                </div>
                                                                <div style={{ display: "flex", marginTop: 20 }}>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "#2ECC70" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "red" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "#FEA520" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                        <Card style={{ width: '18rem', margin: 50, background: "white", border: "solid 1px #CCCCCC", borderRadius: 5 }}>
                                                            <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <div className="bg-secondary" style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>D</p>
                                                                    </div>
                                                                    <p style={{ margin: "0 20px" }}>Pedro da Cunha</p>
                                                                </div>
                                                                <div style={{ display: "flex", marginTop: 20 }}>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "#2ECC70" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "red" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                        <div style={{ width: 20, height: 5, borderRadius: 5, background: "#FEA520" }}></div>
                                                                        <p style={{ margin: "0 10px" }}>1</p>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Carousel>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={5}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Visão geral</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <div style={{ height: 300 }}>
                                                        <DonutChart />
                                                    </div>
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