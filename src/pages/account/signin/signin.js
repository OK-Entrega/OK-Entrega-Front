import React from 'react';
import Logo from "../../../assets/Logo.ico";

export default function SignIn() {

    

    return (
        <div class="auth-wrapper" style={{background: "#031F3C"}}>
            <div class="auth-content">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="mb-4">
                        <img src={Logo} className="logo"></img>
                        </div>
                        <h3 class="mb-4">Entrar</h3>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email"></input>
                        </div>
                        <div class="input-group mb-4">
                            <input type="password" class="form-control" placeholder="Senha"></input>
                        </div>
                        <div class="form-group text-left">
                            <div class="checkbox d-inline">
                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1"></input>
                                <label for="checkbox-fill-a1" class="cr"> Mantenha-me conectado</label>
                            </div>
                        </div>
                        <button class="btn btn-success shadow-2 mb-4">Login</button>
                        <p class="mb-2 text-muted">Esqueceu sua senha? <a href="/i-forgot-my-password/request-new-password">Solicite outra.</a></p>
                        <p class="mb-0 text-muted">Não tem uma conta? <a href="/signup">Cadastre-se.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}