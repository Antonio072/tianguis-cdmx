const clearMarkers = (markers = Set(), map) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

const description = (point) => {
    return `<div><b>Ubicación:</b> ${point['Ubic']}</div>
            <div><b>Horario:</b> ${point['Horario']}</div>
            <div><b>Colonia:</b> ${point['Nombre Col']}</div>
            <div><a target="_blank"href="https://maps.google.com/?q=${point['Latitude']},${point['Longitude']}">¿Cómo llegar?</a><div>`;
};

export { clearMarkers, description };