import React from 'react';
import { Modal, Button, ListGroup, Accordion, Row, Col } from "react-bootstrap";

export default function SeeOccurrencesModal({ ...props }) {
    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShow(false)}>
                <Modal.Title>Visualizar ocorrências</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                {
                    props.occurrences?.map((o, index) => {
                        return <div key={index}>
                            <Accordion >
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1" >
                                        Ocorrência Nº{index + 1}
                                    </Accordion.Toggle>
                                </div>
                                <Accordion.Collapse eventKey="1">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Motorista: {o.delivererName}</ListGroup.Item>
                                        <ListGroup.Item>Motivo: {o.reasonOccurrence}</ListGroup.Item>
                                        <ListGroup.Item>Data: {o.date}</ListGroup.Item>
                                        <ListGroup.Item>
                                            {
                                                o.urlsEvidences
                                                &&
                                                <Row>
                                                    {o.urlsEvidences.map((u, index) => {
                                                        return (
                                                            <Col md={12} key={index}>
                                                                <img loading="lazy" style={{ width: "100%", borderRadius: 10, marginTop: 15 }} src={u}></img>
                                                            </Col>
                                                        );
                                                    })}
                                                </Row>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Collapse>
                            </Accordion>
                        </div>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => props.setShow(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </>
    );
}