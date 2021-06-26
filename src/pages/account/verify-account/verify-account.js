import React, { useEffect, useState } from 'react';
import Logo from "../../../assets/images/logos/Logo.ico";
import { NavLink } from 'react-router-dom';
import { verifyAccount } from "../../../services/user-services";
import { Spinner } from "react-bootstrap";

export default function VerifyAccount() {
    // const shipperId = window.location.href.split("/")[4];
    const shipperId = window.location.href.split("=")[1];

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState();
    const [alreadyVerified, setAlreadyVerified] = useState();

    useEffect(() => {
        setLoading(true);
        let data = { shipperId: shipperId }
        verifyAccount(data)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                if (data.statusCode === 400) {
                    setAlreadyVerified(true);
                    setSuccess(true);
                }
                else if (data.success)
                    setSuccess(true);
                else
                    setSuccess(false);
            });
    }, []);

    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="card">
                        <div className="card-body text-center">
                            {
                                loading
                                    ?
                                    <Spinner animation="border" variant="success" />
                                    :
                                    <>
                                        <div className="mb-4">
                                            <img src={Logo} style={{ height: 50 }}></img>
                                        </div>
                                        <h3 className="mb-4">{alreadyVerified ? "Email já verificado!" : success ? "Email verificado com sucesso!" : "Falha ao verificar o email!"}</h3>
                                        <p className="mb-0 text-muted">{alreadyVerified ? "Seu email já foi verificado anteriormente." : success ? "Agora você está a apenas um passo de usufruir de nosso sistema!" : "Recarregue a página, ou crie outro cadastro."} {success && <NavLink to="/signin">Entre.</NavLink>}{!success && <NavLink to="/signup">Cadastre-se novamente.</NavLink>}</p>
                                        <br></br><br></br>
                                        <NavLink to="/"><i class="fas fa-home"></i> Voltar</NavLink>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}