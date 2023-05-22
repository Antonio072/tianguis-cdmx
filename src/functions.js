import { initLocation } from './getLocation.js';

const clearMarkers = (markers = Set(), map) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

const description = (point) => {
    let day = point['DÍA'].toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    return `<div><b>Ubicación:</b> ${point['Ubic']}</div>
            <div><b>Horario:</b> ${point['Horario']}</div>
            <div><b>Días:</b> ${day}</div>
            <div><b>Colonia:</b> ${point['Nombre Col']}</div>
            <div><a target="_blank"href="https://maps.google.com/?q=${point['Latitude']},${point['Longitude']}">¿Cómo llegar?</a><div>`;
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
}

export { clearMarkers, description, daysInitialLetters, setLocationOnMap };