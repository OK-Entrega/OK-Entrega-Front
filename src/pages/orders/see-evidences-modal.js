import React from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";

export default function SeeEvidencesModal({ ...props }) {
    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowEvidences(false)}>
                <Modal.Title>Visualizar evidências</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                {
                    props.urlsEvidences?.map((e, index) => {
                        return <Row key={index}>
                            <Col md={12}>
                                <img loading="lazy" style={{ width: "100%", borderRadius: 10, marginTop: 15 }} src={e}></img>
                            </Col>
                        </Row>
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => props.setShowEvidences(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </>
    );
}