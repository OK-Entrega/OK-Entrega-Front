import React, { useEffect, useState } from 'react';
import "../../assets/scss/style.scss";
import Header from "../../components/header/header";
import Company from "./company";
import { Row, Container, Spinner } from "react-bootstrap";
import { getMine } from "../../services/company-services";

const styleContainerNoData = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
}

export default function MyCompanies() {

    const [data, setData] = useState([]);

    useEffect(() => {
        list();
    }, []);

    const list = () => {
        getMine()
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }

    return (
        <>
            <Header myCompanies={true} list={list} />
            {
                data.data === undefined && data.statusCode === undefined
                    ?
                    <Container style={styleContainerNoData}>
                        <Spinner animation="border" variant="success" />
                    </Container>
                    :
                    data.statusCode === 404
                        ?
                        <Container style={styleContainerNoData}>
                            <div style={{ textAlign: "center", opacity: 0.7 }}>
                                <i class="fas fa-building" style={{ fontSize: 20, marginBottom: 20 }}></i>
                                <p>Você não está em nenhuma empresa! <br></br>Que tal criar ou entrar em uma?</p>
                            </div>
                        </Container>
                        :
                        <Container>
                            <Row>
                                {
                                    data?.data?.map((c, index) => {
                                        return <Company key={index} name={c.name} urlLogo={c.urlLogo} segment={c.segment} id={c.companyId} />
                                    })
                                }
                            </Row>
                        </Container>
            }
        </>
    );
}