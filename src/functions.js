import { initLocation } from './getLocation.js';

const clearMarkers = (markers = Set(), map) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

const description = (point) => {
    let is_v2 = (point["location"] != undefined) ? true : false;
    let day = point['dia'].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    return `<div><b>Ubicación:</b> ${point['ubicacion']}</div>
            <div><b>Horario:</b> ${point['horario']}</div>
            <div><b>Días:</b> ${day}</div>
            <div><b>Colonia:</b> ${point['nombre_col']}</div>
            <div><a target="_blank"href="https://maps.google.com/?q=${is_v2 ? point["location"]['coordinates'][1]: point["latitud"]},${is_v2 ? point["location"]['coordinates'][0] : point["longitud"]}">¿Cómo llegar?</a><div>`;
};

let days = {
  0: "Lun",
  1: "Mar",
  2: "Mié",
  3: "Jue",
  4: "Vie",
  5: "Sáb",
  6: "Dom"
}


function daysInitialLetters (day, initialsString) {
  if (day === 'week') return '';
  // Verificamos si la cadena está vacía
  if (initialsString === "") { return day; }
  
  // Verificamos si la letra ya está en la cadena, si esta la elimina
  if (initialsString.includes(day)) {
    let newString = "";
    let lettersArray = initialsString.split(", ");
    for (let i = 0; i < lettersArray.length; i++) {
      if (lettersArray[i] !== day) {
        newString += lettersArray[i] + ", ";
      }
    }
    newString = newString.substring(0, newString.length - 2);
    return newString;
  }
  
  initialsString += ", " + day;
  
  // Creamos un arreglo con las letras de la cadena
  let lettersArray = initialsString.split(", ");
  
  // Ordenamos el arreglo de letras según el orden del día en el que se encuentran
  // en el objeto "days"
  let sortedLettersArray = [];
  for (let key in days) {
    for (let i = 0; i < lettersArray.length; i++) {
      if (days[key] === lettersArray[i]) {
        sortedLettersArray.push(lettersArray[i]);
      }
    }
  }
  
  // Creamos una cadena con las letras ordenadas
  let sortedString = "";
  for (let i = 0; i < sortedLettersArray.length; i++) {
    sortedString += sortedLettersArray[i] + ", ";
  }
  sortedString = sortedString.substring(0, sortedString.length - 2);
  
  return sortedString;
  }

async function setLocationOnMap(map){
  let location = await initLocation();
  if (location) {
    map.setView(location, 16);
  }
  return location
}


function paintIconByDay(dayColor){
  const ICON = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
    <svg fill="${dayColor}" width="30px" height="30px" viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0">
      <rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="19.2" fill="#000000" strokewidth="0.5"/>
    </g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="16"/> </g>
    </svg>`;
  let iconUrl = 'data:image/svg+xml;base64,' + btoa(ICON);

    return new L.icon({
      iconUrl: iconUrl,
    });
}

export { clearMarkers, description, daysInitialLetters, setLocationOnMap, paintIconByDay };