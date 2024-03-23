import { clearMarkers, description, daysInitialLetters, setLocationOnMap, paintIconByDay } from './src/functions.js';
import { getDataFromAPI, getNearestTianguis } from './mongo.js';
import { getColorFromDay } from './src/constants.js';

let selectedDays = [];
let selectedTownHall = 'NINGUNO';
/*
    Queries:
        1.- Initial query (today, 'Ninguno')
        2.- Day change ([selectedDays], 'Ninguno')
        3.- All data ('TODOS', 'TODOS')
        4.- Lunes tlalpan (['Lunes'], 'Tlalpan')
        5.- Lunes martes tlalpan (['Lunes', 'Martes'], 'Tlalpan')


    Instead of using data that is already in the client, we should use the API
    Remove filteredPointsByDay and filteredPointsByTownHall
    It should have 2 global variables: selectedDays and selectedTownHall
    selectedDays = ['Lunes', 'Martes']
    selectedTownHall = 'Tlalpan'
    When the user selects a day, it should be added to the selectedDays array
    When the user selects a town hall, it should be added to the selectedTownHall array
    When the user unselects a day, it should be removed from the selectedDays array
    When the user switches to 'TODOS', it should remove all the selectedDays (this is not necessary due to backend override)
    When the user switches to 'TODAS' it changes the String to 'TODOS'

    Steps:
        1.- Push items when day is changed
        2.- Change string when townhall is changed
*/
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

document.getElementById('dayDropdown').addEventListener('click', () => {
    document.getElementById('dayDropdownContent').classList.toggle('hidden');
});


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', async () => {
        let daysPlaceholder = document.getElementById('daysInitials');
        if (checkbox.value === 'week') {
            if (checkbox.checked) {
                ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => {    
                    daysPlaceholder.innerText = daysInitialLetters(day, daysPlaceholder.innerText)
                })
                selectedDays.push('TODOS')
            }
            else {
                selectedDays = []
                daysPlaceholder.innerText = '';
                checkboxes.forEach(checkbox => checkbox.checked = false)
            }
        }
        else {
            let day = checkbox.value.slice(0,1).toUpperCase()
            let parsedDay = day + checkbox.value.slice(1,3);
            if (checkbox.checked) {
                selectedDays.push(checkbox.value)
            }
            else {
                selectedDays = selectedDays.filter(day => day !== checkbox.value)
            }
            daysPlaceholder.innerText = daysInitialLetters(parsedDay, daysPlaceholder.innerText)
        }
        clearMarkers(markers, map);
        let points = await getDataFromAPI(selectedDays, selectedTownHall)
        points.data.forEach(point => {
            let coloredIcon = paintIconByDay(getColorFromDay(point["dia"]));
            markers.add(L.marker([point["latitud"], point["longitud"]], {icon:coloredIcon}).addTo(map).bindPopup(description(point)));
        })
    });
});

let townHall = document.getElementById('townHall');
townHall.addEventListener('change', async () => {
    clearMarkers(markers, map);
    selectedTownHall = townHall.value;
    let points = await getDataFromAPI(selectedDays, selectedTownHall)
    points.data.forEach(point =>{
        let coloredIcon = paintIconByDay(getColorFromDay(point["dia"]));

        markers
        .add(
            L.marker([point["latitud"], point["longitud"]], {icon:coloredIcon}).
                addTo(map).
                    bindPopup(description(point)
            )
        )}
    )
}) 

async function init(){
    let locationButton = document.getElementById('locationButton');
    locationButton.addEventListener('click',async () =>{
        let {0: latitud, 1: longitud } = await setLocationOnMap(map)
        
        let points = await getNearestTianguis(latitud, longitud)
        console.log(points)
        points.data.forEach(point => {
            let coloredIcon = paintIconByDay(getColorFromDay(point["dia"]));

            console.log(coloredIcon);
            markers.add(L.marker([point["location"]["coordinates"][1], point["location"]["coordinates"][0]], {icon:coloredIcon}).addTo(map).bindPopup(description(point)));
        })
    
    })

    let todayCheckbox = document.getElementById(today)
    todayCheckbox.checked = true;
    let event = new Event('change');
    todayCheckbox.dispatchEvent(event);
}

window.onload = async () => {
    let loader = document.getElementById('loader');
    let main = document.getElementById('main');
    main.style.display = 'none';
    
    // let location = await initLocation();
    // if (location) {
    //     map.setView(location, 16);
    //     loader.style.display = 'none';
    //     main.style.display = 'block';     
    // }
    // else {
        loader.style.display = 'none';
        main.style.display = 'block';
    // }
    await init();
    // NOTE: Leaflet map doesn't renders properly so window resize is needed
    // TODO: Find a better solution
    window.dispatchEvent(new Event('resize'));
}
