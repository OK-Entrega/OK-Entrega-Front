import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import bbox from "@turf/bbox";
import { multiPoint } from "@turf/helpers";
import Markers from "./markers";

const mapboxAccessToken = "pk.eyJ1IjoiZGFuaWVsbWVuZGVzZG9hbWFyYWwiLCJhIjoiY2txMDlyNWJlMDI3bTJwcXB6eG81c3A5NCJ9.BJhRkIhhatTaORr9nttEug";

const mapContainerStyle = {
    width: "98.7vw",
    height: "100vh",
    overflow: "hidden"
}

const Map = ({...props}) => {
    const mapContainerRef = useRef(null)

    const [map, setMap] = useState(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            accessToken: mapboxAccessToken,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-54.341456, -16.291757],
            zoom: 2,
        })

        map.addControl(new mapboxgl.NavigationControl(), "top-right")

        setMap(map)

        return () => map.remove()
    }, [])

    useEffect(() => {
        if (!map) return

        if (props.data?.length > 0) {
            const coords = []
            props.data.forEach(place => {
                coords.push([props.longitude, place.latitude])
            })
            const feature = multiPoint(coords)
            const box = bbox(feature)

            map.fitBounds(
                [
                    [box[0], box[1]],
                    [box[2], box[3]],
                ],
                {
                    padding: 20,
                    maxZoom: 14,
                    duration: 2000,
                }
            )
        } else {
            map.easeTo({
                center: [-54.341456, -16.291757],
                zoom: 10,
                duration: 2000,
            })
        }
    }, [map])

    return (
        <div ref={mapContainerRef} style={mapContainerStyle}>
            {props.data && map && <Markers map={map} places={props.data} />}
        </div>
    )
}

export default Map;