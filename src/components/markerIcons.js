import L from 'leaflet';
import redIcon from '../assets/red.png';
import greenIcon from '../assets/green.png';
import yellowIcon from '../assets/yellow.png';
import whiteIcon from '../assets/white.png';

// icons defined here, outside the component
const redMarker = new L.Icon({
    iconUrl: redIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
});

const yellowMarker = new L.Icon({
    iconUrl: yellowIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
});

const greenMarker = new L.Icon({
    iconUrl: greenIcon,
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
});

const whiteMarker = new L.Icon({
    iconUrl: whiteIcon,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
});


function checkType(value) {
    console.log("Value:", value, "Type:", typeof value);
}
function getOpacityForDate(dateString) {
    if (!dateString || typeof dateString !== "string") {
        // fallback opacity if date is missing or invalid
        return 1;
    }
    const dateOnly = dateString.split("T")[0];

    const markerDate = new Date(dateOnly);
    const now = new Date();

    const diffTime = Math.abs(now - markerDate);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays <= 3) return 1.0;     // Very recent
    if (diffDays <= 7) return 0.6;     // Recent
    if (diffDays <= 14) return 0.3;    // Older
    return 0.15;                   // Fading
}

//assign the marker icons to severity levels
function fusedIcons(severity, dateString) {
    const marker = {
        high: redMarker,
        medium: yellowMarker,
        low: greenMarker,
        backGround: whiteMarker
    };
    return L.divIcon({
        className: 'combinedMarker',
        html: `<div style="position: relative; width: 35px; height: 35px;">
        <img src="${whiteMarker.options.iconUrl}" 
             style="position:absolute;
                    width:45px;height:45px;
                    top:0;left:0;
                    opacity:${getOpacityForDate(dateString)}
                    pointer-events: none;" />

        <img src="${marker[severity].options.iconUrl}" 
             style="position:absolute;
                    width:30px;height:30px;
                    top:10px;left:10px;" />
    </div>`,
        iconSize: [35, 35],
        iconAnchor: [17, 17],
    })
}
export default fusedIcons;