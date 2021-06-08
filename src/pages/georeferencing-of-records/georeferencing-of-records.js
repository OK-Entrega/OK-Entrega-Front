import React from 'react';
import Header from "../../components/header/header";
import NavAside from "../../components/nav-aside/nav-aside";
import { Row, Col, Card } from "react-bootstrap";
//import { Map, Scene } from '@esri/react-arcgis';
import {
    useMap, useScene, useWebMap, useWebScene,
    useEvent, useEvents, useWatch, useWatches,
    useGraphic, useGraphics
} from 'esri-loader-hooks';

export default function GeoreferencingOfRecords() {
    const [ref] = useWebMap('e691172598f04ea8881cd2a4adaa45ba');
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
                                        <Col md={6}>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">Cadastro de entregas</Card.Title>
                                                </Card.Header>
                                                <Card.Body>

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