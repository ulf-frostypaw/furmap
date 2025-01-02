import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import MarkerClusterGroup from "react-leaflet-markercluster";

const customIcon = new L.Icon({
  iconUrl: import.meta.env.VITE_APP_URL + "/images/marker.png",
  iconSize: [28, 38],
});

interface MarkerData {
  id: number;
  user_token: string;
  username: string;
  name: string;
  user_picture: string;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/locations/fetch");

        // Verifica si la respuesta es 404
        if (response.status === 404) {
            console.error("No locations found.");
            return; // Salir de la función si no hay locaciones
        }

        // Si la respuesta es exitosa, convierte a JSON
        const data = await response.json();
        setMarkers(data);
    } catch (error) {
        console.error("Error fetching markers:", error);
    }
    };

    fetchMarkers();
  }, []);

  const position: [number, number] = [0, 0]; /// center map

  // map limits
  const bounds: [[number, number], [number, number]] = [
    [-90, -180], // Suroeste
    [90, 180], // Noreste
  ];

  return (
    <Layout title="Map">
      <MapContainer
        center={position}
        zoom={2}
        style={{ height: "calc(100vh - 57px)", width: "100%" }}
        maxZoom={18}
        minZoom={2}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {markers.map((marker) => (
            <Marker
              key={marker.user_token}
              position={[marker.latitude, marker.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div className="text-center">
                  <picture>
                    <img
                      src={import.meta.env.VITE_API_URL + "/storage/" + marker.user_picture}
                      alt={"User picture: " + marker.name}
                      style={{
                        aspectRatio: "1/1",
                        maxWidth: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  </picture>

                  <div>
                    <span>{marker.name}</span>
                    <div>
                      <Link
                        to={
                          import.meta.env.VITE_APP_URL +
                          "/profile/" +
                          marker.username
                        }
                        className="btn btn-primary"
                        style={{ color: "#fff" }}
                      >
                        <FontAwesomeIcon icon={faIdBadge} /> View profile
                      </Link>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Layout>
  );
};

export default Map;
