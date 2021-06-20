import React, { useRef, useEffect } from "react"
import mapboxgl from "!mapbox-gl" // eslint-disable-line import/no-webpack-loader-syntax

const Marker = ({ map, place }) => {
    const markerRef = useRef();

    const selectIconVehicle = (vehicleType) => {
        switch(vehicleType) {
            case "Caminhão":
                return "<i class='fas fa-truck'></i>";
            case "Furgão":
                return "<i class='fas fa-shuttle-van'></i>";
            case "Moto":
                return "<i class='fas fa-motorcycle'></i>";
            case "Navio":
                return "<i class='fas fa-ship'></i>";
            case "Outro":
                return "";
        }
    }

    const formatAccessKey = (accessKey) => {
        let result="";
        for(let c=0; c<accessKey.length;c++) {
            if(c>0 && c%4===0 && result.length!==23 && result.length!==35 && result.length!==46)
                result+="."
            result += accessKey[c];
            if(result.length===19 || c===31 || c===47)
                result+="<br>"
        }
        return result;
    }

    const setColor = (type) => {
        switch(type) {
            case "Devolução":
                return "#FF0000";
            case "Entregue com sucesso":
                return "#2ECC71";
            case "Ocorrência":
                return "#FEA520";
        }
    }

    let html = `
        <h5>${place.delivererName}</h5>
        <hr>
        <b>Celular:</b>
        <p>+55 ${place.cellphoneNumber.substring(0, 2)} ${place.cellphoneNumber.substring(2, 7)}-${place.cellphoneNumber.substring(7, 13)}</p>
        <b>Veículo:</b>
        <p>${selectIconVehicle(place.vehicleType)} ${place.vehiclePlate ? place.vehiclePlate : ''}</p>
        <b>Data:</b>
        <p>${place.date}</p>
        <b>Chave de acesso:</b>
        <p>${formatAccessKey(place.accessKey)}</p>
    `

    useEffect(() => {
        const marker = new mapboxgl.Marker({color: setColor(place.type), markerRef})
            .setLngLat([place.longitude, place.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(html))
            .addTo(map)

        return () => marker.remove()
    })

    return <div ref={markerRef} color="#111111"/>
}

const Markers = ({ map, places }) => {
    return (
        <>
            {places &&
                places.map((place, index) => (
                    <Marker key={index} map={map} place={place} />
                ))}
        </>
    )
}

export default Markers