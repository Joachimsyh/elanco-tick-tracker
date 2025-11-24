import L from 'leaflet';
import redIcon from '../assets/red.png';
import greenIcon from '../assets/green.png';
import yellowIcon from '../assets/yellow.png';
import whiteIcon from '../assets/white.png';
/*
  Define custom Leaflet marker icons.
  These are created outside of any component to avoid re-creating them on each render.
  Each icon has:
    - iconUrl: path to image
    - iconSize: width and height in pixels
    - iconAnchor: point of the icon which will be at the marker’s LatLng (bottom center)
    - popupAnchor: point relative to icon where popup appears
*/
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
/*
  calculateOpacity:
  - Determines how transparent a marker should be based on its date.
  - Newer sightings appear more visible, older ones fade.
  - Returns a number between 0.12 (very old) and 1.0 (recent ≤1 year)
*/
const calculateOpacity = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
        return 0.6;
    }

    const entryDate = new Date(dateString);  //convert string to Date
    const now = new Date();

    const diffInMs = now - entryDate; // difference in milliseconds
    const diffYears = diffInMs / (1000 * 60 * 60 * 24 * 365);// convert to years
    // assign opacity based on how old the sighting is
    if (diffYears <= 1) return 1.0;
    if (diffYears <= 3) return 0.7;
    if (diffYears <= 6) return 0.55;
    if (diffYears <= 9) return 0.4;
    if (diffYears <= 12) return 0.25;
    return 0.12;
}

/*
  fusedIcons:
  - Combines a colored severity marker with a semi-transparent white background.
  - This helps indicate both severity and the age of the sighting in a single visual.
  - Returns a Leaflet divIcon, which allows custom HTML inside markers.
*/
function fusedIcons(severity, dateString) {
    const marker = {
        high: redMarker,
        medium: yellowMarker,
        low: greenMarker,
        backGround: whiteMarker
    };
    return L.divIcon({
        className: 'combinedMarker', // CSS class for possible additional styling
        html: `<div style="position: relative; width: 35px; height: 35px;">
        <img src="${whiteMarker.options.iconUrl}" 
             style="position:absolute;
                    width:45px;height:45px;
                    top:0;left:0;
                    opacity:${calculateOpacity(dateString)};
                    pointer-events: none;" />

        <!-- Foreground colored marker representing severity -->

        <img src="${marker[severity].options.iconUrl}" 
             style="position:absolute;
                    width:25px;height:25px;
                    top:10px;left:10px;" />
    </div>`,
        iconSize: [35, 35],
        iconAnchor: [17, 17], // Center of the combined icon
    })
}
export default fusedIcons;