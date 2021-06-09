import React from 'react';
import "../../assets/scss/style.scss";
import { Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Company({ ...props }) {
    return (
        <Col>
            <Card style={{ width: '18rem', margin: 50, background: "white", border: "solid 1px #CCCCCC", borderRadius: 5 }}>
                <Card.Body>
                    <Card.Title style={{ display: "flex", justifyContent: "space-between" }}>
                        {props.name}
                        {props.urlLogo && <img src={props.urlLogo} style={{ width: 30, borderRadius: 15 }}></img>}
                    </Card.Title>
                    <Card.Text>
                        {
                            props.segment === "Outro"
                                ?
                                "Outro segmento"
                                :
                                `Empresa de ${props.segment.toLowerCase()}`
                        }
                    </Card.Text>
                    <Link to={`/my-companies/${props.id}/dashboard`}>
                        <Button variant="success" style={{ width: "75%", margin: "auto", height: 25, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => {
                            localStorage.removeItem("companyId");
                            localStorage.setItem("companyId", props.id);
                        }}>Ver</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}