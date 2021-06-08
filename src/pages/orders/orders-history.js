import React from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card, Table, Container, Pagination, Form, Accordion, Button } from "react-bootstrap";

export default function OrdersHistory() {
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
                                                    <Card.Title as="h5">Histórico de entregas</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Accordion style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                        <Card.Header>
                                                            <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                                                                <i class="fas fa-filter"></i> Habilitar filtros
                                                            </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                            <Form style={{ margin: "10px 0 75px 0" }}>

                                                                <h5>Filtro</h5>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Label>Tipo de finalização</Form.Label>
                                                                        <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                            <option>Entrega</option>
                                                                            <option>Devolução</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Destinatário|CNPJ</Form.Label>
                                                                            <Form.Control type="text" placeholder="Destinatário|CNPJ" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Transportadora|CNPJ</Form.Label>
                                                                            <Form.Control type="text" placeholder="Transportadora|CNPJ" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}></Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão maior que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de emissão menor que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho maior que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de despacho menor que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de finalização maior que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Data de finalização menor que</Form.Label>
                                                                            <Form.Control type="date" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Motivo de ocorrência</Form.Label>
                                                                            <Form.Control type="text" label="Motivo de ocorrências" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Motivo de devolução</Form.Label>
                                                                            <Form.Control type="text" label="Motivo de devoluções" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Motorista</Form.Label>
                                                                            <Form.Control type="text" label="Motorista" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Tipo do veículo</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <option>Caminhão</option>
                                                                                <option>Furgão</option>
                                                                                <option>Moto</option>
                                                                                <option>Navio</option>
                                                                                <option>Outro</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Placa do veículo</Form.Label>
                                                                            <Form.Control type="text" label="Placa do veículo" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Valor total maior que</Form.Label>
                                                                            <Form.Control type="text" label="Valor total maior que" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Valor total menor que</Form.Label>
                                                                            <Form.Control type="text" label="Valor total menor que" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Peso bruto menor que</Form.Label>
                                                                            <Form.Control type="text" label="Peso bruto maior que" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Peso bruto menor que</Form.Label>
                                                                            <Form.Control type="text" label="Peso bruto menor que" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Chave de acesso</Form.Label>
                                                                            <Form.Control type="text" label="Chave de acesso" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>CEP</Form.Label>
                                                                            <Form.Control type="text" label="CEP" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Logradouro</Form.Label>
                                                                            <Form.Control type="text" label="Logradouro" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Número</Form.Label>
                                                                            <Form.Control type="text" label="Número" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Complemento</Form.Label>
                                                                            <Form.Control type="text" label="Complemento" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Bairro</Form.Label>
                                                                            <Form.Control type="text" label="Bairro" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Cidade</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <optgroup label="Região Sul">
                                                                                    <option value="PR">Paraná</option>
                                                                                    <option value="SC">Santa Catarina</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Sudeste">
                                                                                    <option value="ES">Espírito Santo</option>
                                                                                    <option value="MG">Minas Gerais</option>
                                                                                    <option value="RJ">Rio de Janeiro</option>
                                                                                    <option value="SP" selected>São Paulo</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Centro-Oeste">
                                                                                    <option value="DF">Distrito Federal</option>
                                                                                    <option value="GO">Goiás</option>
                                                                                    <option value="MT">Mato Grosso</option>
                                                                                    <option value="MS">Mato Grosso do Sul</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Nordeste">
                                                                                    <option value="AL">Alagoas</option>
                                                                                    <option value="BA">Bahia</option>
                                                                                    <option value="CE">Ceará</option>
                                                                                    <option value="MA">Maranhão</option>
                                                                                    <option value="PB">Paraíba</option>
                                                                                    <option value="PE">Pernambuco</option>
                                                                                    <option value="PI">Piauí</option>
                                                                                    <option value="RN">Rio Grande do Norte</option>
                                                                                    <option value="SE">Sergipe</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Norte">
                                                                                    <option value="AC">Acre</option>
                                                                                    <option value="AM">Amazonas</option>
                                                                                    <option value="AP">Amapá</option>
                                                                                    <option value="PA">Pará</option>
                                                                                    <option value="RO">Rondônia</option>
                                                                                    <option value="RR">Roraima</option>
                                                                                    <option value="TO">Tocantins</option>
                                                                                </optgroup>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>UF</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <optgroup label="Região Sul">
                                                                                    <option value="PR">PR</option>
                                                                                    <option value="SC">SC</option>
                                                                                </optgroup>
                                                                                <optgroup label="Região Sudeste">
                                                                                    <option value="ES">ES</option>
                                                                                    <option value="MG">MG</option>
                                                                                    <option value="RJ">RJ</option>
                                                                                    <option value="SP" selected>SP</option>
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
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Situação do canhoto</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <option>Válido</option>
                                                                                <option>Sem data</option>
                                                                                <option>Sem assinatura</option>
                                                                                <option>Sem número e série</option>
                                                                                <option>Número e série incorretos</option>
                                                                                <option>Data incorreta</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                                <hr></hr>
                                                                <Row>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Ordenar por</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <option>Válido</option>
                                                                                <option>Inválido</option>
                                                                                <option>Sem data</option>
                                                                                <option>Sem assinatura</option>
                                                                                <option>Sem número e série</option>
                                                                                <option>Número e série incorretos</option>
                                                                                <option>Data incorreta</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col md={3}>
                                                                        <Form.Group>
                                                                            <Form.Label>Ordenar de forma</Form.Label>
                                                                            <Form.Control size="sm" as="select" style={{ height: 42 }}>
                                                                                <option>Ascendente</option>
                                                                                <option>Descendente</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Row>
                                                            </Form>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <h5>Entregas</h5>
                                                    <Table responsive className="table table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Tipo de finalização</th>
                                                                <th>Destinatário|CNPJ</th>
                                                                <th>Transportadora|CNPJ</th>
                                                                <th>Data de emissão</th>
                                                                <th>Data de despacho</th>
                                                                <th>Data de finalização</th>
                                                                <th>Duração</th>
                                                                <th>Ocorrências</th>
                                                                <th>Motorista e veículo</th>
                                                                <th>Documentos</th>
                                                                <th>Valor total</th>
                                                                <th>Peso bruto</th>
                                                                <th>Chave de acesso</th>
                                                                <th>CEP</th>
                                                                <th>Logradouro</th>
                                                                <th>Número</th>
                                                                <th>Complemento</th>
                                                                <th>Bairro</th>
                                                                <th>Cidade</th>
                                                                <th>UF</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>filtrar por situação do canhoto</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                                <td>Teste</td>
                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                    <Container style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
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