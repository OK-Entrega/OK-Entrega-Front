import React from "react";

export default function Shipper({ ...props }) {
    return (
        <tr className="unread">
            <td>
                <div className={props.role==="eu" ? "theme-bg" : "bg-secondary"} style={{ height: 35, width: 35, borderRadius: "100%", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>D</p>
                </div>
            </td>
            <td>
                <h6 className="mb-1">Daniel Mendes do Amaral</h6>
                <p className="m-0">Criador</p>
            </td>
            <td>
                <h6 className="text-muted">Entrou em 11/05/2020 12:56</h6>
            </td>
            <td>
                <span className="label text-white theme-bg2 f-12 danger" style={{cursor: "pointer"}}>Expulsar</span>
            </td>
        </tr>
    )
}