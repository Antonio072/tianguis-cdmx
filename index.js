import { points } from './src/data/tianguis.js';
import { colors } from './src/constants.js';
import { clearMarkers, description } from './src/functions.js';
import { initLocation } from './src/getLocation.js';

let markers = new Set();
let ciudad_mexico = [19.3326, -99.1332];

var map = L.map('map',{zoomControl: false}).setView(ciudad_mexico, 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

let today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
let checkboxes = document.querySelectorAll('input[type="checkbox"]');



checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        let filteredPoints = getPointsByDay(checkbox.value);
        // Agrega los puntos que ya se filtraron por alcaldia
        if (checkbox.checked) 
            filteredPoints.forEach(point => {
                markers.add(L.marker([point["Latitude"], point["Longitude"]]).addTo(map).bindPopup(description(point)));
            })
        // Revisa que puntos ya estan marcados y los quita
        else
            filteredPoints.forEach(point => {
                markers.forEach(marker => {
                    if (marker.getLatLng().lat === point["Latitude"] && marker.getLatLng().lng === point["Longitude"]) {
                        map.removeLayer(marker);
                        markers.delete(marker);
                    }
                })
            })
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
      
    let filteredPoints;
    let townHall = document.getElementById('townHall');
    let townHallPoints = getPointsByTownHall(townHall.value, points);
    
    if (day === "week"){
        clearMarkers(markers, map);
        filteredPoints = townHallPoints;
        // Cambia todos los checkboxes de los dias 
        document.querySelectorAll('input[type="checkbox"]').forEach(element => element.checked = checkbox.checked);
    }
    else {
        // Quita el 'todos' si se selecciona un dia
        document.getElementById('week').checked = false;
        filteredPoints = townHallPoints.filter(point => point["DÍA"] === day.toUpperCase())
    }
    return filteredPoints;
}

// Filters todays points by alcaldia
function getPointsByTownHall(name, points) {
    if (name === "TODAS") return points;
    let filteredPoints = points.filter(point => point["Alcaldía"] === name);
    return filteredPoints;
}

let townHall = document.getElementById('townHall');
townHall.addEventListener('change', () => {
    // Obtiene los checkboxes de los dias que ya estan activos para refiltrar por alcaldia
    let checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    clearMarkers(markers, map);
    if (townHall.value !== 'NINGUNA' && townHall.value !== 'TODAS') {
        checkedBoxes.forEach(checkbox => {
            let filteredPointsByDay = getPointsByDay(checkbox.value);
            filteredPointsByDay.forEach(point => {
                markers.add(L.marker([point["Latitude"], point["Longitude"]]).addTo(map).bindPopup(description(point)));
            })
        })
    }
    if (townHall.value === 'TODAS'){
        checkedBoxes.forEach(checkbox => {
            let filteredPointsByDay = getPointsByDay(checkbox.value);
            filteredPointsByDay.forEach(point => {
                markers.add(L.marker([point["Latitude"], point["Longitude"]]).addTo(map).bindPopup(description(point)));
            })
        })
    }

}) 

async function init(){
    let filteredPoints = getPointsByDay(today);
    filteredPoints.forEach(point => {
        markers.add(L.marker([point["Latitude"], point["Longitude"]]).addTo(map).bindPopup(description(point)));
    })
    document.getElementById(today).checked = true;
}

window.onload = async () => {
    let loader = document.getElementById('loader');
    let main = document.getElementById('main');
    main.style.display = 'none';
    
    let location = await initLocation();
    if (location) {
        map.setView(location, 13);
        loader.style.display = 'none';
        main.style.display = 'block';     
    }
    else {
        loader.style.display = 'none';
        main.style.display = 'block';
    }
    await init();
    // NOTE: Leaflet map doesn't renders properly so window resize is needed
    // TODO: Find a better solution
    window.dispatchEvent(new Event('resize'));
}
