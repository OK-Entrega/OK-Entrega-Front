import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, Button } from "react-bootstrap";
import Logo from "../../assets/images/logos/Logo.ico";
import { Link } from "react-router-dom";
import CreateNewCompanyModal from "./create-new-company-modal";
import JoinInACompanyModal from "./join-in-a-company-modal";
import { getProfile } from '../../services/user-services';
import { getDetails, leaveFromCompany } from "../../services/company-services";
import ChangePasswordModal from "./change-password-modal";
import ChangeEmailModal from "./change-email-modal";
import ChangeUserModal from "./change-user-modal";
import DeleteAccountModal from './delete-account-modal';
import ChangeCompanyModal from "./change-company-modal";
import DeleteCompanyModal from './delete-company-modal';
import { useToasts } from "react-toast-notifications";

const styleInMyCompanies = {
    margin: "auto",
    width: "95vw"
}

export default function Header({ myCompanies = false, list }) {

    const { addToast } = useToasts();
    const companyId = localStorage.getItem("companyId");

    const [showCreateNewCompanyModal, setShowCreateNewCompanyModal] = useState(false);
    const [showJoinInACompanyModal, setShowJoinInACompanyModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
    const [showChangeUserModal, setShowChangeUserModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [showChangeCompanyModal, setShowChangeCompanyModal] = useState(false);
    const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);

    useEffect(() => {
        getProfile()
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
    }, []);

    useEffect(() => {
        if (!myCompanies)
            getDetails(encodeQueryData({ companyId: companyId }))
                .then(response => response.json())
                .then(data => {
                    setDetails(data.data);
                })
    }, []);

    function leave() {

        let answer = window.confirm("Tem certeza de que deseja sair desta empresa?")

        if (answer) {
            leaveFromCompany({ companyId: companyId })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        addToast(data.message, { appearance: "success", autoDismiss: true });
                        setTimeout(() => {
                            window.location.href = "http://localhost:3000/";
                        }, 500)
                    }
                    else
                        addToast(data.message, { appearance: "error", autoDismiss: true });
                })
        }
    }

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    const [data, setData] = useState({});
    const [details, setDetails] = useState({});

    return (
        <>
            <header className="navbar pcoded-header navbar-expand-lg" style={myCompanies ? styleInMyCompanies : null}>
                {
                    myCompanies
                    &&
                    <Link to="/">
                        <img src={Logo} style={{ width: 60, margin: 10 }}></img>
                    </Link>
                }
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {
                            myCompanies
                            &&
                            <li style={{ marginRight: 25 }}>
                                <Dropdown className="drp-user-modified">
                                    <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                        <i class="fas fa-plus" style={{ fontSize: 20, marginRight: 0 }}></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu alignRight className="profile-notification">
                                        <ul className="pro-body">
                                            <Modal show={showCreateNewCompanyModal}><CreateNewCompanyModal setShow={setShowCreateNewCompanyModal} list={list} /></Modal>
                                            <li style={{ cursor: "pointer" }} onClick={() => setShowCreateNewCompanyModal(true)}><a className="dropdown-item"><i className="feather icon-plus" /> Criar empresa</a></li>
                                            <Modal show={showJoinInACompanyModal}><JoinInACompanyModal setShow={setShowJoinInACompanyModal} list={list} /></Modal>
                                            <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => setShowJoinInACompanyModal(true)}><i className="feather icon-user-plus" /> Entrar com c??digo de empresa</a></li>
                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        }
                        {
                            !myCompanies
                            &&
                            <>
                                <a href="/"><i class="fas fa-home" style={{ fontSize: 20, marginRight: 15 }}></i></a>
                                <li style={{ marginRight: 10 }}>
                                    <Dropdown className="drp-user-modified">
                                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                            <a href="" onClick={(e) => e.preventDefault()}>
                                                <i class="fas fa-ellipsis-v" style={{ fontSize: 18 }}></i>
                                                <i class="fas fa-ellipsis-v" style={{ fontSize: 18 }}></i>
                                                <i class="fas fa-ellipsis-v" style={{ fontSize: 18 }}></i>
                                            </a>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu alignRight className="profile-notification">
                                            <ul className="pro-body">
                                                {
                                                    details?.myRole === 0
                                                    &&
                                                    <>
                                                        <Modal show={showChangeCompanyModal}><ChangeCompanyModal setShowChangeCompanyModal={setShowChangeCompanyModal} companyId={companyId} /></Modal>
                                                        <li style={{ cursor: "pointer" }} onClick={() => setShowChangeCompanyModal(true)}><a className="dropdown-item"><i class="fas fa-building"></i> Editar empresa</a></li>
                                                        <Modal show={showDeleteCompanyModal}><DeleteCompanyModal setShowDeleteCompanyModal={setShowDeleteCompanyModal} companyId={companyId} /></Modal>
                                                        <li><a className="dropdown-item" style={{ cursor: "pointer", color: "red" }} onClick={() => setShowDeleteCompanyModal(true)}><i className="fas fa-trash-alt" /> Excluir empresa</a></li>
                                                    </>
                                                }
                                                <li><a className="dropdown-item" style={{ cursor: "pointer", color: "red" }} onClick={() => {
                                                    leave();
                                                }}><i class="fas fa-user-minus"></i> Sair da empresa</a></li>
                                            </ul>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </>
                        }
                        <li>
                            <Dropdown className="drp-user">
                                <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                    <div className="theme-bg" style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>{data.data?.name?.substring(0, 1).toUpperCase()}</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight className="profile-notification" style={{ marginTop: 10 }}>
                                    <div className="pro-head">
                                        <span>{data.data?.name}</span>
                                        <a className="dud-logout" title="Logout" style={{ cursor: "pointer" }} onClick={() => {
                                            localStorage.removeItem("jwt");
                                            window.location.href = `http://localhost:3000/`
                                        }}>
                                            <i className="feather icon-log-out" />
                                        </a>
                                    </div>
                                    <ul className="pro-body">
                                        <li>
                                            <Modal show={showChangeUserModal}><ChangeUserModal setShowChangeUserModal={setShowChangeUserModal} /></Modal>
                                            <a className="dropdown-item">
                                                <Button variant="link" onClick={() => setShowChangeUserModal(true)}>
                                                    <i className="fas fa-user" />
                                                </Button>
                                                {data.data?.name}
                                            </a>
                                        </li>
                                        <li>
                                            <Modal show={showChangeEmailModal}><ChangeEmailModal setShowChangeEmailModal={setShowChangeEmailModal} /></Modal>
                                            <a className="dropdown-item">
                                                <Button variant="link" onClick={() => setShowChangeEmailModal(true)}>
                                                    <i class="fas fa-envelope"></i>
                                                </Button>
                                                {data.data?.email}
                                            </a>
                                        </li>
                                        <li>
                                            <Modal show={showChangePasswordModal}><ChangePasswordModal setShowChangePasswordModal={setShowChangePasswordModal} /></Modal>
                                            <a className="dropdown-item">
                                                <Button variant="link" onClick={() => setShowChangePasswordModal(true)}>
                                                    <i class="fas fa-key"></i>
                                                </Button>
                                                ********
                                            </a>
                                        </li>
                                        <li>
                                            <Modal show={showDeleteAccountModal}><DeleteAccountModal setShowDeleteAccountModal={setShowDeleteAccountModal} /></Modal>
                                            <a className="dropdown-item" style={{ color: "red" }}>
                                                <Button variant="link" onClick={() => setShowDeleteAccountModal(true)}>
                                                    <i class="fas fa-trash-alt" style={{ color: "red" }}></i>
                                                </Button>
                                                Excluir conta
                                            </a>
                                        </li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </header>
            {myCompanies && <div style={{ width: "100vw", height: 0.5, background: "#BBBBBB" }}></div>}
        </>
    );
}