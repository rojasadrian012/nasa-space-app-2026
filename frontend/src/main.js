import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";

const cdeLocation = [25.5036, 54.6507];

const map = L.map("mapa-demo").setView(cdeLocation, 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const API_URL = "http://localhost:3000/barrios";

const getBarrios = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  return res.json();
};

try {
  const geojson = await getBarrios();
  const capa = L.geoJSON(geojson, {
    onEachFeature: (feature, layer) =>
      layer.bindPopup(feature.properties.nombre),
  }).addTo(map);
  map.fitBounds(capa.getBounds());
} catch (error) {
  console.error("No se pudieron cargar los datos:", error);
}
