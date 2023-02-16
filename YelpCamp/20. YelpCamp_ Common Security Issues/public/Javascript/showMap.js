mapboxgl.accessToken = mapToken //maptoken is defined inside show.ejs template
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campInfo.geometry.coordinates, // starting position [lng, lat]
    zoom: 12, // starting zoom
});
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

//popup from doc
//mapbox-gl --> markers and controls --> popup
const markerHeight = 50;
const markerRadius = 10;
const linearOffset = 25;
const popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};
const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
    .setHTML(`<h5>${campInfo.title}</h5><p>${campInfo.location}</p>`)


//add a marker 
//see docs --> mapbox-gl --> markers and controls 
new mapboxgl.Marker() 
.setLngLat(campInfo.geometry.coordinates)
.setPopup(popup)
.addTo(map);