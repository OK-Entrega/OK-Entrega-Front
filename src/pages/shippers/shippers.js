import React, { useEffect, useRef, useState } from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Form, Table, Container, Spinner, Button } from "react-bootstrap";
import GeneratePagination from "../../components/generate-pagination/generate-pagination";
import Shipper from "./shipper";
import { getShippers, inviteShipper } from "../../services/company-services";
import "./shippers.css";
import { useToasts } from "react-toast-notifications";

export default function Shippers() {

    const companyId = localStorage.getItem("companyId");

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/shippers`;

    useEffect(() => {
        list({ companyId: companyId }, true, true);
    }, []);

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const list = async (params, getCode, getShippersCount) => {

        let queryString = encodeQueryData(params);

        getShippers(queryString)
            .then(response => response.json())
            .then(data => {
                setData(data)
                if (getCode)
                    setCode(data.data?.code);
                if (getShippersCount)
                    setShippersCount(data.data?.shippersCount)
            });
    }

    const copyToClipboard = (e) => {
        const code = h6Ref.current.innerText.trim();
        navigator.clipboard.writeText(code);
        e.target.focus();
    };

    const [data, setData] = useState([]);
    const [shippersCount, setShippersCount] = useState(null);
    const [pageActive, setPageActive] = useState(1);
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const h6Ref = useRef(null);
    const { addToast } = useToasts();

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
                                                                <Form.Control type="text" placeholder="Nome" onChange={(e) => {
                                                                    list({ companyId: companyId, name: e.target.value }, false, false);
                                                                }} />
                                                            </Form.Group>
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
                                                                        <h6>Nenhum embarcador encontrado!</h6>
                                                                    </div>
                                                                </Container>
                                                                :
                                                                <>
                                                                    <Table responsive hover>
                                                                        <tbody>
                                                                            {
                                                                                data.data?.shippers.map((s, index) => {
                                                                                    return <Shipper key={index} shipperRole={s.shipperRole} name={s.name} joinedAt={s.joinedAt} canBan={data.data.canBan} shipperId={s.id} companyId={companyId} list={list} />
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </Table>
                                                                    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                                                                        <GeneratePagination pageCount={data?.data?.pageCount} setPageActive={setPageActive} pageActive={pageActive} />
                                                                    </div>
                                                                </>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} xl={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Card>
                                                        <Card.Body className='border-bottom'>
                                                            <div className="row d-flex align-items-center">
                                                                <div className="col-auto">
                                                                    <i className="feather icon-user f-30 text-c-green" />
                                                                </div>
                                                                {
                                                                    shippersCount
                                                                        ?
                                                                        <div className="col">
                                                                            <h3 className="f-w-300">{shippersCount}</h3>
                                                                            <span className="d-block text-uppercase">Embarcadores</span>
                                                                        </div>
                                                                        :
                                                                        <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                            <Spinner animation="border" variant="success" />
                                                                        </Container>
                                                                }
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md={12}>
                                                    <Card>
                                                        <Card.Body className='border-bottom'>
                                                            <div className="row d-flex align-items-center justify-content-center flex-direction-column">
                                                                <h5>Convidar embarcadores</h5>
                                                                <Form style={{ display: "flex", justifyContent: "center", marginBottom: 20, marginTop: 20 }}>
                                                                    <Form.Group style={{ width: "auto", marginLeft: 10 }}>
                                                                        <Form.Label>Email</Form.Label>
                                                                        <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => {
                                                                            setEmail(e.target.value);
                                                                        }} />
                                                                        <div style={{ display: "flex", justifyContent: "center", marginTop: 15 }}>
                                                                            <span className="label text-white theme-bg f-12 danger" style={{ cursor: "pointer", borderRadius: 15, margin: "auto" }} onClick={() => {
                                                                                inviteShipper({ companyId: companyId, email: email })
                                                                                    .then(response => response.json())
                                                                                    .then(data => {
                                                                                        if (data.success)
                                                                                            addToast(data.message, { appearance: "success", autoDismiss: true });
                                                                                        else
                                                                                            addToast(data.message, { appearance: "error", autoDismiss: true });
                                                                                    })
                                                                            }}>Enviar convite</span>
                                                                        </div>
                                                                    </Form.Group>
                                                                </Form>
                                                                <div style={{ textAlign: "center" }}>
                                                                    <p>Ou envie o código</p>
                                                                    <div className="copy" id="t" ref={h6Ref} onClick={(e) => {
                                                                        copyToClipboard(e);
                                                                        addToast("Copiado!", { appearance: "success", autoDismiss: true });
                                                                    }}>
                                                                        <h6 className="copy">{code}<span> <i class="fas fa-clipboard"></i></span></h6>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
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