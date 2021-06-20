import React, { useEffect, useState } from 'react';
import NavAside from "../../components/nav-aside/nav-aside";
import { Modal } from "react-bootstrap";
import Map from "./map";
import FilterModal from './filter-modal';
import {getGeoreferencingData} from "../../services/company-services";

export default function GeoreferencingOfRecords() {

    const companyId = localStorage.getItem("companyId");

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    if (!String(window.location.href).includes(String(localStorage.getItem("companyId"))))
        window.location.href = `http://localhost:3000/my-companies/${companyId}/georeferencing-of-records`;

    useEffect(() => {
        listMarkers();
    }, []);

    const listMarkers = (params) => {
        
        getGeoreferencingData(params ? encodeQueryData(params) : encodeQueryData({companyId: companyId}) )
            .then(response => response.json())
            .then(data => {
                setData(data);
            })

    }

    function encodeQueryData(data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    return (
        <>
            <NavAside />
            <div className="pcoded-main-container" style={{ minHeight: "0vh" }}>
                <div className="pcoded-wrapper" style={{ minHeight: "0vh" }}>
                    <div className="pcoded-content" style={{ minHeight: "0vh", padding: 0 }}>
                        <div className="pcoded-inner-content" style={{ minHeight: "0vh" }}>
                            <div className="main-body" style={{position: "absolute", zIndex: 1, top: 20, left: 20}}>
                                <Modal show={show}><FilterModal setShow={setShow} listMarkers={listMarkers} companyId={companyId} /></Modal>
                                <button style={{boxShadow: "none", borderRadius: 5, background: "#F2F2F2", border: "solid 1px #BBBBBB", width: 29, height: 29}} onClick={() => setShow(true)}><i class="fas fa-filter" style={{ margin: 0, fontSize: 11 }}></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Map data={data.data} />
        </>
    );
}