const clearMarkers = (markers = Set(), map) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

const description = (point) => {
    return `<div><b>Ubicación:</b> ${point['Ubic']}</div>
            <div><b>Horario:</b> ${point['Horario']}</div>
            <div><b>Colonia:</b> ${point['Nombre Col']}</div>`;
};

export { clearMarkers, description };