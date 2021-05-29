import React from 'react';
import NavAside from "../../components/nav-aside";
import {useParams} from "react-router-dom";

export default function Orders() {

    const {companyId} = useParams();

    return (
        <>
            <NavAside page="orders" companyId={companyId}/>
        </>
    );
}