import { useEffect } from "react"; 
import Layout from "../components/Layout";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
interface MapProps {
    position: {
        lng: number;
        lat: number;
    };
    name: string;
    _id: number;
}

const mcg = L.markerClusterGroup({
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    spiderfyOnMaxZoom: true,
});

// Define un icono personalizado para los marcadores
const markerIcon = new L.Icon({
    iconUrl: './images/marker.png',
    iconSize: [28, 38],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const MarkerCluster = ({ markers }: { markers: MapProps[]; }) => {
    const map = useMap();

    useEffect(() => {
        mcg.clearLayers();
        markers.forEach(({ position, name }) => {
            L.marker(new L.LatLng(position.lat, position.lng), {
                icon: markerIcon // custom icon
            })
            .addTo(mcg)
            .bindPopup(name);
        });

        map.addLayer(mcg);
    }, [markers, map]);

    return null;
};

export default function Map() {
    const markersUsers = [
        {
            position: { lng: -100.7189763, lat: 21.2709003 },
            name: 'User 1',
            _id: 1,
        },
        {
            position: { lng: -100.7189763, lat: 22.2709003 },
            name: 'User 2',
            _id: 2,
        },
        {
            position: { lng: -101.7189763, lat: 23.2709003 },
            name: 'User 3',
            _id: 3,
        },
        {
            position: { lng: -99.7189763, lat: 31.2709003 },
            name: 'User 4',
            _id: 4,
        },
    ];

    return (
        <Layout title="Map">
            <MapContainer center={[21.2709003, -100.7189763]} zoom={5} scrollWheelZoom={true} style={{ height: "calc(100vh - 56px)" }}>
                <TileLayer
                    attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                    url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <MarkerCluster markers={markersUsers} />
            </MapContainer>
        </Layout>
    );
}