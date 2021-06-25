import React from 'react';
import notebook from '../../assets/images/home/notebook-cellphone.png';
import okzinho from '../../assets/images/logos/Logo.ico';
import googlePlayBadge from "../../assets/images/home/google-play.png";
import appleStoreBadge from "../../assets/images/home/app-store.png";
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import './home.css';
import { Link } from "react-scroll";

export default function Home() {
    return (
        <>
            <div className="home" style={{ overflow: "hidden" }}>
                <Navbar collapseOnSelect expand="lg" style={{ background: "#031F3C", borderBottom: "solid 2px #2ecc71" }} variant="dark">
                    <Container>
                        <Navbar.Brand href="/" style={{ background: "#031F3C" }}>
                            <img
                                src={okzinho}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                            /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Início</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="/signin">Entre</Nav.Link>
                                <Nav.Link href="/signup">Cadastre-se</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container style={{ height: "90vh", display: "flex", alignItems: "center" }}>
                    <Row>
                        <Col md={6}>
                            <h2 style={{ fontWeight: "500" }}>Gerencie suas entregas com nossa solução em nuvem  </h2>
                            <h4 style={{ margin: "40px 0 20px 0" }}>Saiba tudo o que você pode fazer com nossos sistemas web/mobile.</h4>
                            <div class="botao">
                                <Link to="start" smooth={true} duration={500}><Button>Ver mais</Button></Link>
                                <a href="/signup"><Button variant="success">Começar</Button></a>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div class="imagem">
                                <img src={notebook} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container id="start">
                    <h2 style={{ fontWeight: "500", textAlign: "center", marginBottom: 100 }}>Aqui, você pode:</h2>
                    <Row>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6><span className="green">Gerenciar</span> sua organização.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6>Fazer o <span className="green">upload</span> de suas <span className="green">XMLs</span>.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6>Utilizar <span className="green">dashboards</span> e <span className="green">mapas interativos</span>.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6>Fornecer <span className="green">scanners</span> para seus motoristas.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6>Utilizar canhotos <span className="green">digitais</span>.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card style={{ borderRadius: 5 }}>
                                <Card.Body>
                                    <Card.Text>
                                        <h6>Utilizar <span className="green">OCRs</span> para identificar anomalias nos canhotos.</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <div class="divisao">
                    <div class="tempo">
                        <h2 style={{ fontWeight: "500", textAlign: "center", margin: "50px 0" }}>Não perca mais tempo!</h2>
                        <div className="botao">
                            <a href="/signup"><Button variant="success">Começar</Button></a>
                            <Button className="available"><img src={googlePlayBadge} style={{ width: 30 }}></img> Disponível na Play Store</Button>
                            <Button className="available"><img src={appleStoreBadge} style={{ width: 30 }}></img> Disponível na Apple Store</Button>
                        </div>
                    </div>
                </div>
                <div style={{ height: 100 }}></div>
            </div>
        </>
    );
}