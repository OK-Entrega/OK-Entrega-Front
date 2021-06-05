import React from 'react';
import "../../../assets/scss/style.scss";
import {NavLink} from 'react-router-dom';
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import Logo from "../../../assets/images/logos/Logo.ico";
import './signing.css'

export default function SignIn() {
    return (
        <>
            <Breadcrumb/> 
            <div className="Fundo">
                <div className="Verde">

                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <img src={Logo} style={{height: 50}}></img>
                                </div>
                                <h3 className="mb-4">Entre com sua conta!</h3>
                                <form class="needs-validation">
                                  
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email"/>
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="Senha"/>
                                        <div className="invalid-feedback">Teste</div>
                                    </div>
                                  
                                    <button className="btn btn-success shadow-2 mb-4">Entrar</button>
                                </form>
                                        <p className="mb-0 text-muted">Esqueceu sua senha? <NavLink to="/i-forgot-my-password/request-new-password">Clique aqui!</NavLink></p>
                                <p className="mb-0 text-muted">Não tem uma conta? <NavLink to="/signUp">Crie uma!.</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                                    </div>
        </>
    );
}