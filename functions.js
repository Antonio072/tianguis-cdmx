const clearMarkers = (markers = Set()) => {
    markers.forEach(marker => {
        map.removeLayer(marker);
    })
    markers.clear();
};

export { clearMarkers };