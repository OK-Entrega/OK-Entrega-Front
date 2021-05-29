import React from 'react';
import Logo from "../../../assets/Logo.ico";
import { signup } from "../../../services/account";
import { useFormik } from "formik";

export default function SignUp() {

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            const data = await signup(values);
            console.log(data);
        }
    });
    
    return (
        <div class="auth-wrapper" style={{ background: "#031F3C" }}>
            <div class="auth-content">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="mb-4">
                            <img src={Logo} className="logo"></img>
                        </div>
                        <h3 class="mb-4">Criar conta</h3>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nome" name="name" value={formik.values.name} onChange={formik.handleChange}></input>
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange}></input>
                        </div>
                        <div class="input-group mb-4">
                            <input type="password" class="form-control" placeholder="Senha" name="password" value={formik.values.password} onChange={formik.handleChange}></input>
                        </div>
                        <button class="btn btn-success shadow-2 mb-4" onClick={formik.handleSubmit}>Criar</button>
                        <p class="mb-2 text-muted">Já tem uma conta? <a href="/signin">Entre.</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}