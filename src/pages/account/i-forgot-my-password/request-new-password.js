import React from 'react';
import Logo from "../../../assets/Logo.ico";

export default function RequestNewPassword() {
    return (
        <div class="auth-wrapper" style={{ background: "#031F3C" }}>
            <div class="auth-content">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="mb-4">
                            <img src={Logo} className="logo"></img>
                        </div>
                        <h3 class="mb-4">Solicitar nova senha</h3>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email"></input>
                        </div>
                        <button class="btn btn-success shadow-2 mb-4">Solicitar</button>
                        <p class="mb-0 text-muted">Não tem uma conta? <a href="/signup">Cadastre-se.</a></p>
                        <p class="mb-0 text-muted">Lembrou a senha? <a href="/signup">Entre.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}