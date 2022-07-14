import { points } from './tianguis.js';
import { colors } from './src/constants.js';

let markers = new Set();
let ciudad_mexico = [19.3326, -99.1332];

var map = L.map('map').setView(ciudad_mexico, 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
let checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let filteredPoints = getPointsByDay(checkbox.value);
        if (checkbox.checked) {
            filteredPoints.forEach(point => {
                markers.forEach(marker => {
                    if (marker._latlng.lat === point["Latitude"] && marker._latlng.lng === point["Longitude"]) {
                        map.removeLayer(marker);
                    }
                })
            })
        } else {
            getPointsByDay(checkbox.value);
            checkbox.checked = !checkbox.checked;
        }
        checkbox.checked = !checkbox.checked;
    });
});

function getPointsByDay(day) {
    // Replace accents with normal letters
    let day_normal = day.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let color = colors[day_normal];
    const icon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [0, 0],
        popupAnchor: [0, 0],
        html: `<span class="icon" style='background-color: ${color}' />`
      })
    let checkbox = document.getElementById(day);
    checkbox.checked = !checkbox.checked;
    let filteredPoints = points.filter(point => point["DÍA"] === day.toUpperCase())
    filteredPoints.forEach(point => {
        markers.add(L.marker([point["Latitude"], point["Longitude"]], {icon:icon}).addTo(map));
    })
    return filteredPoints;
}
// This inits the current day points
getPointsByDay(today);