import {
	Suspense,
	useState
} from 'react';
import 'leaflet/dist/leaflet.css';
//import { supabase } from '../client';
import {
	MapContainer,
	TileLayer,
	useMap
} from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from "react";
import markerImage from '/src/images/marker_small.png';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import Layout from '../components/Layout';

interface MarkerProps {
	position: {
		lng: number;
		lat: number;
	};
	name: string, _id: number;
}

const mcg = L.markerClusterGroup({
	showCoverageOnHover: true,
	zoomToBoundsOnClick: true,
	spiderfyOnMaxZoom: true,

});

const icon = L.icon({
	iconUrl: markerImage,
	iconSize: [41, 41],
});


const MarkerCluster = ({ markers }: { markers: MarkerProps[]; }) => {
	const map = useMap();

	useEffect(() => {
		mcg.clearLayers();
		console.log(markers);
		markers.forEach(({ position, name }) => {
			return L.marker(new L.LatLng(position.lat, position.lng), {
				icon: icon
			})
				.addTo(mcg)
				.bindPopup(name);
		}
		);

		// optionally center the map around the markers
		//map.fitBounds(mcg.getBounds());
		// // add the marker cluster group to the map
		map.addLayer(mcg);
	}, [markers, map]);
	return null;
};


const Map = () => {
	const [markers, setMarkers] = useState<MarkerProps[]>([]);
	const markersUsers = [
		{
			position: {
				lng: -100.7189763,
				lat: 21.2709003
			},
			name: 'User 1',
			_id: 1
		}
	];
	/* useEffect(() => {
		supabase.from('markers').select('lng, lat, name, id')
			.then(res => res.data)
			.then((res) => {
				for (let marker of res || []) {
					setMarkers([...markers, {
						position: {
							lng: marker.lng,
							lat: marker.lat
						},
						name: marker.name,
						_id: marker.id
					}]);
				}
			}, (err) => {
				console.log(err);
			});
	}, []); */
	return (
		<Layout title="Map">
			<Suspense>
				<MapContainer center={[21.2709003, -100.7189763]} zoom={5} scrollWheelZoom={true} style={{ height: "calc(100vh - 56px)" }}>
					<TileLayer
						attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
						url={"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"}
					/>
					<MarkerCluster markers={markersUsers} />
				</MapContainer>
			</Suspense>
		</Layout>
	);
};

export default Map;
