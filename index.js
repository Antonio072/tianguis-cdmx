
const container = document.getElementById('map')
let ciudad_mexico = [19.4326, -99.1332]
    var map = L.map('map').setView(ciudad_mexico, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
   

