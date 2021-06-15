import React, { useEffect, useState } from 'react';
import Logo from "../../assets/images/logos/Logo.ico";
import { NavLink } from 'react-router-dom';
import { useToasts } from "react-toast-notifications";
import { acceptInvite } from "../../services/company-services";
import { Spinner } from "react-bootstrap";

export default function AcceptInvite() {
    const companyId = window.location.href.split("/")[5];
    const shipperId = window.location.href.split("/")[6];

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        setLoading(true);
        let data = { companyId: companyId, shipperId: shipperId }
        console.log(data)
        acceptInvite(data)
            .then(response => response.json())
            .then(data => {
                if (data.statusCode === 400)
                    setSuccess(false);
                else if (data.statusCode === 200) {
                    addToast(data.message, { appearance: "success", autoDismiss: true })
                    setSuccess(true);
                }
                setLoading(false);
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
                                        {
                                            !success
                                                ?
                                                <>
                                                    <h3 className="mb-4">Você já está nessa empresa!</h3>
                                                    <p className="mb-0 text-muted">Veja <NavLink to="/my-companies">suas empresas.</NavLink></p>
                                                </>
                                                :
                                                <>
                                                    <h3 className="mb-4">Entrou com sucesso!</h3>
                                                    {
                                                        setTimeout(() => {
                                                            window.location.href = "http://localhost:3000/my-companies";
                                                        }, 1000)
                                                    }
                                                </>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}