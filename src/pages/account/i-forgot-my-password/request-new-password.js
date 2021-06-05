import React from 'react';
import "../../../assets/scss/style.scss";
import {NavLink} from 'react-router-dom';
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import Logo from "../../../assets/images/logos/Logo.ico";
import './esqueciMinhaSenha.css'

export default function RequestNewPassword() {
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
                                <h3 className="mb-4">Esqueci minha senha</h3>
                                <form class="needs-validation">
                                  
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email"/>
                                    </div>

                                  <p>Um email com mais instruções será enviado para o seu endereço de email.</p>
                                  
                                    <button className="btn btn-success shadow-2 mb-4">Enviar</button>
                                </form>
                            
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                                    </div>
        </>
    );
}