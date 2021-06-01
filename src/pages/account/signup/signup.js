import React from 'react';
import "../../../assets/scss/style.scss";
import {NavLink} from 'react-router-dom';
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import Logo from "../../../assets/images/logos/Logo.ico";

export default function SignUp() {
    return (
        <>
            <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <img src={Logo} style={{height: 50}}></img>
                                </div>
                                <h3 className="mb-4">Junte-se a nós</h3>
                                <form class="needs-validation">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="Nome"/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email"/>
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password" className="form-control" placeholder="Senha"/>
                                        <div className="invalid-feedback">Teste</div>
                                    </div>
                                    <div className="form-group text-left">
                                        <div className="checkbox checkbox-fill d-inline">
                                            <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2"/>
                                                <label htmlFor="checkbox-fill-2" className="cr">Aceito os <a href="#"> termos e condições</a> do sistema.</label>
                                        </div>
                                    </div>
                                    <button className="btn btn-success shadow-2 mb-4">Criar conta</button>
                                </form>
                                <p className="mb-0 text-muted">Já tem uma conta? <NavLink to="/signin">Entre.</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}