import React from 'react';
import { Modal, Button, Row, Col } from "react-bootstrap";

export default function SeeVoucherModal({ ...props }) {
    return (
        <>
            <Modal.Header closeButton onClick={() => props.setShowVoucher(false)}>
                <Modal.Title>Visualizar Canhoto</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ width: "90%", maxWidth: 400, margin: "auto" }}>
                <Row>
                    <Col md={12}>
                        <img loading="lazy" style={{ width: "100%", borderRadius: 10 }} src={props.urlVoucher}></img>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => props.setShowVoucher(false)}>
                    Fechar
                </Button>
            </Modal.Footer>
        </>
    );
}