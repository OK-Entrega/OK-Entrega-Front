import React from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Form, Table, Container, Pagination } from "react-bootstrap";
import Shipper from "./shipper";

export default function Shippers() {
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
                                        <Col md={6} xl={8}>
                                            <Card className='Recent-Users'>
                                                <Card.Header>
                                                    <Card.Title as='h5'>Embarcadores</Card.Title>
                                                </Card.Header>
                                                <Card.Body className='px-0 py-2'>
                                                    <Container>
                                                        <Form style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 20 }}>
                                                            <Form.Group style={{ width: "auto", marginLeft: 10 }}>
                                                                <Form.Label>Filtrar por nome</Form.Label>
                                                                <Form.Control type="text" placeholder="Nome" />
                                                            </Form.Group>
                                                        </Form>
                                                    </Container>
                                                    <Table responsive hover>
                                                        <tbody>
                                                            <Shipper role="eu" />
                                                            <Shipper />
                                                            <Shipper />
                                                            <Shipper />
                                                        </tbody>
                                                    </Table>
                                                    <Container style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                                                        <Pagination>
                                                            <Pagination.Prev />
                                                            <Pagination.Item>{1}</Pagination.Item>
                                                            <Pagination.Item active>{2}</Pagination.Item>
                                                            <Pagination.Item>{3}</Pagination.Item>
                                                            <Pagination.Next />
                                                        </Pagination>
                                                    </Container>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} xl={4}>
                                            <Card>
                                                <Card.Body className='border-bottom'>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-auto">
                                                            <i className="feather icon-user f-30 text-c-green" />
                                                        </div>
                                                        <div className="col">
                                                            <h3 className="f-w-300">10</h3>
                                                            <span className="d-block text-uppercase">Embarcadores</span>
                                                        </div>
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