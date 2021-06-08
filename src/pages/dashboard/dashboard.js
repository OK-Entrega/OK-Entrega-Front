import React from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Alert, Form } from "react-bootstrap";
import { LineChart } from "../../components/charts/charts";

export default function Dashboard() {
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
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Visão geral</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Form style={{marginBottom: 50, display: "flex", justifyContent: "center"}}>
                                                        <Form.Group style={{width: "auto", marginRight: 20}}>
                                                            <Form.Label>Filtrar por</Form.Label>
                                                            <Form.Control size="sm" as="select" style={{height: 42}}>
                                                                <option>Dia</option>
                                                                <option>Mês</option>
                                                                <option>Ano</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                            <Form.Group style={{width: "8%"}}>
                                                                <Form.Label>Dia</Form.Label>
                                                                <Form.Control type="text" placeholder="Dia" />
                                                            </Form.Group>
                                                            <Form.Group style={{width: "8%", marginLeft: 10}}>
                                                                <Form.Label>Mês</Form.Label>
                                                                <Form.Control type="text" placeholder="Mês" />
                                                            </Form.Group>
                                                            <Form.Group style={{width: "8%", marginLeft: 10}}>
                                                                <Form.Label>Ano</Form.Label>
                                                                <Form.Control type="text" placeholder="Ano" />
                                                            </Form.Group>
                                                    </Form>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <Alert variant="dark">
                                                            <Alert.Heading>20 notas</Alert.Heading>
                                                            <p>
                                                                Foram lançadas 20 notas
                                                        </p>
                                                        </Alert>
                                                        <Alert variant="success">
                                                            <Alert.Heading>15 entregas</Alert.Heading>
                                                            <p>
                                                                75% das notas lançadas <br></br> foram entregues
                                                        </p>
                                                        </Alert>
                                                        <Alert variant="danger" >
                                                            <Alert.Heading>5 devoluções</Alert.Heading>
                                                            <p>
                                                                25% das notas lançadas <br></br> foram devolvidas
                                                        </p>
                                                        </Alert>
                                                        <Alert variant="warning">
                                                            <Alert.Heading>50 ocorrências</Alert.Heading>
                                                            <p>
                                                                Em média, cada nota teve <br></br> 2 a 3 ocorrências
                                                        </p>
                                                        </Alert>
                                                    </div>
                                                    <div style={{ height: 300 }}>
                                                        <LineChart />
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