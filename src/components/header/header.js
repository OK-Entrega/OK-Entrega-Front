import React, {useState} from 'react';
import { Dropdown, Modal, Button } from "react-bootstrap";
import Logo from "../../assets/images/logos/Logo.ico";
import { Link } from "react-router-dom";
import CreateNewCompanyModal from "./create-new-company-modal";
import JoinInACompanyModal from "./join-in-a-company-modal";

const styleInMyCompanies = {
    margin: "auto",
    width: "95vw"
}

export default function Header({ myCompanies = false, list }) {
    const [showCreateNewCompanyModal, setShowCreateNewCompanyModal] = useState(false);
    const [showJoinInACompanyModal, setShowJoinInACompanyModal] = useState(false);

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
                                            <Modal show={showCreateNewCompanyModal}><CreateNewCompanyModal setShow={setShowCreateNewCompanyModal} list={list}/></Modal>
                                            <li style={{cursor: "pointer"}} onClick={() => setShowCreateNewCompanyModal(true)}><a className="dropdown-item"><i className="feather icon-plus"/> Criar empresa</a></li>
                                            <Modal show={showJoinInACompanyModal}><JoinInACompanyModal setShow={setShowJoinInACompanyModal} list={list}/></Modal>
                                            <li><a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => setShowJoinInACompanyModal(true)}><i className="feather icon-user-plus" /> Entrar com código de empresa</a></li>
                                        </ul>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        }
                        <li>
                            <Dropdown className="drp-user">
                                <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                    <div className="theme-bg" style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>D</p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight className="profile-notification" style={{ marginTop: 10 }}>
                                    <div className="pro-head">
                                        {/* <img src={Avatar1} className="img-radius" alt="User Profile" /> */}
                                        <span>Teste de nome grande</span>
                                        <a className="dud-logout" title="Logout">
                                            <i className="feather icon-log-out" />
                                        </a>
                                    </div>
                                    <ul className="pro-body">
                                        <li><a className="dropdown-item"><i className="feather icon-company" /> Criar empresa</a></li>
                                        <li><a className="dropdown-item"><i className="feather icon-user-plus" /> Entrar em empresa</a></li>
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