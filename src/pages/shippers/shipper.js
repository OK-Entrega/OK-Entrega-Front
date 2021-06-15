import React, { useState } from "react";
import "./shippers.css";
import {removeShipper} from "../../services/company-services";
import { useToasts } from "react-toast-notifications";

export default function Shipper({ ...props }) {

    const [ban, setBan] = useState(false);
    const { addToast } = useToasts();

    return (
        <tr className="unread" style={{ display: "flex", justifyContent: "space-between" }}>
            <td style={{ display: "flex" }}>
                <div className={props.name === "Eu" ? "theme-bg" : "bg-secondary"} style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center", marginRight: 20 }}>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>{props.name.substring(0, 1).toUpperCase()}</p>
                </div>
                <div>
                    <h6 className="mb-1">{props.name}</h6>
                    <p className="m-0">{props.shipperRole}</p>
                </div>
            </td>
            <td style={{ display: "flex", justifyContent: "end" }}>
                <div style={{ textAlign: "center" }}>
                    {
                        ban && props.canBan && props.name !== "Eu"
                        ?
                        <i className="fas fa-user-minus" onMouseLeave={() => setBan(false)} onClick={() => {
                            removeShipper({companyId: props.companyId, shipperId: props.shipperId})
                                .then(response => response.json())
                                .then(data => {
                                    if(data.success) {
                                        addToast(data.message, { appearance: "success", autoDismiss: true });
                                        props.list({companyId: props.companyId, name: ""}, false, false);
                                    }
                                    else
                                        addToast(data.message, { appearance: "error", autoDismiss: true });
                                })
                        }}></i>
                        :
                        <i className="fa fa-user" onMouseEnter={() => setBan(true)}></i>
                    }
                    <h6 className="text-muted">Entrou em {props.joinedAt}</h6>
                </div>
            </td>
        </tr>
    )
}