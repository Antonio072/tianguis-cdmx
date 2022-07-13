import { points } from './tianguis.js';
const container = document.getElementById('map')
let ciudad_mexico = [19.4326, -99.1332]
    var map = L.map('map').setView(ciudad_mexico, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
let today = new Date().toLocaleDateString('es-ES', {weekday: 'long'});
function getPointsByDay(day) {
    return points.filter(point => point["DÍA"] === day.toUpperCase());
}
let todaysPoints = getPointsByDay(today);
todaysPoints.forEach(point => {
    L.marker([point["Latitude"], point["Longitude"]]).addTo(map);
});
