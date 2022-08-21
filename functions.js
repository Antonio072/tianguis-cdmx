const clearMarkers = (markers = Set(), map) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

export { clearMarkers };