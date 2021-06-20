import React, { useState, useEffect } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Alert, Form, Container, Spinner } from "react-bootstrap";
import { LineChart } from "../../components/charts/charts";
import { getDashboardData } from '../../services/company-services';

export default function Dashboard() {

    const companyId = localStorage.getItem("companyId");

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/dashboard`;

    useEffect(() => {
        list();
    });

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const list = async () => {

        let params = { companyId: companyId, year: new Date().getMonth(), month: new Date().getFullYear() }
        let queryString = encodeQueryData(params);

        getDashboardData(queryString)
            .then(response => response.json())
            .then(data => {
                setData(data)
            });
    }

    const [type, setType] = useState("month");
    const [data, setData] = useState({});

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
                                                    {
                                                        data.data === undefined && data.statusCode === undefined
                                                            ?
                                                            <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
                                                                <Spinner animation="border" variant="success" />
                                                            </Container>
                                                            :
                                                            <>
                                                                <Form style={{ marginBottom: 50, display: "flex", justifyContent: "center" }}>
                                                                    <Form.Group style={{ width: "auto", marginRight: 20 }}>
                                                                        <Form.Label>Filtrar por</Form.Label>
                                                                        <Form.Control size="sm" as="select" style={{ height: 42 }} onChange={(e) => setType(e.target.value)}>
                                                                            <option value="month">Mês</option>
                                                                            <option value="year">Ano</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                    {
                                                                        type === "month"
                                                                        &&
                                                                        <Form.Group style={{ width: "10%", marginLeft: 10 }}>
                                                                            <Form.Label>Mês</Form.Label>
                                                                            <Form.Control type="number" placeholder="Mês" onChange={(e) => {
                                                                                //setMonth(e.target.value)
                                                                                list();
                                                                            }} />
                                                                        </Form.Group>
                                                                    }
                                                                    <Form.Group style={{ width: "10%", marginLeft: 10 }}>
                                                                        <Form.Label>Ano</Form.Label>
                                                                        <Form.Control type="number" placeholder="Ano" onChange={(e) => {
                                                                            //setYear(e.target.value);
                                                                            list();
                                                                        }}/>
                                                                    </Form.Group>
                                                                </Form>
                                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <Alert variant="dark">
                                                                        <Alert.Heading>{data.data?.notesCount} notas</Alert.Heading>
                                                                        <p>
                                                                            Foram lançadas {data.data?.notesCount} notas
                                                                        </p>
                                                                    </Alert>
                                                                    <Alert variant="success">
                                                                        <Alert.Heading>{data.data?.finishedsWithSuccessCount} entregas</Alert.Heading>
                                                                        <p>
                                                                            {data.data?.finishedsWithSuccessPercentage} das notas lançadas <br></br> foram entregues
                                                                        </p>
                                                                    </Alert>
                                                                    <Alert variant="danger" >
                                                                        <Alert.Heading>{data.data?.finishedsWithDevolutionCount} devoluções</Alert.Heading>
                                                                        <p>
                                                                            {data.data?.finishedsWithDevolutionPercentage} das notas lançadas <br></br> foram devolvidas
                                                                        </p>
                                                                    </Alert>
                                                                    <Alert variant="warning">
                                                                        <Alert.Heading>{data.data?.occurrencesCount} ocorrências</Alert.Heading>
                                                                        <p>
                                                                            Em média, cada nota teve <br></br> {data.data?.occurrencesAverage} ocorrências
                                                                        </p>
                                                                    </Alert>
                                                                </div>
                                                                <div style={{ height: 300 }}>
                                                                    <LineChart data={data.data?.graphs} legendX={type === "Month" ? "Semanas" : "Meses"} /> 
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