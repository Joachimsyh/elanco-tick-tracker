import React from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import fusedIcons from './markerIcons';
import { MapLegend } from './MapLegend';

/*
  Map Component:
  - Displays a map with markers for tick sightings
  - Uses React.forwardRef to expose a method (refreshReports) to parent components
  - Props:
      onMarkerSelect → callback when a marker is clicked
*/
const Map = ({ onMarkerSelect, reports }) => {


    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "1000px", width: "1480px", position: "relative" }}
        >
            <MapLegend />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />



            {reports.map((s, i) => {
                // jitter to be added ONLY once per marker.
                // useMemo ensures this code runs once and returns the SAME result forever.
                const jittered = getStableJitter(i, s);
                return (
                    <Marker
                        key={i} // Unique key for React
                        position={[jittered.lat, jittered.lng]} // Marker position with jitter
                        icon={fusedIcons(getSeverity(s.location), s.date)} // Custom icon based on severity and date
                        eventHandlers={{
                            click: () => onMarkerSelect && onMarkerSelect(s), //callback on marker click
                            mouseover: (e) => { e.target.openPopup(); }, // Show popup on hover
                            mouseout: (e) => {
                                if (!e.target.isPopupOpen()) return;
                                e.target.closePopup();
                            } // Hide popup when not hovering
                        }}
                    >
                        {/* Popup content for each marker */}
                        <Popup closebutton={false}>
                            <div style={{ userSelect: "none" }}>
                                <strong>{s.species}</strong><br />
                                {s.location}<br />
                                {s.date} {s.time}
                            </div>
                        </Popup>
                    </Marker>
                );
            })
            }
        </MapContainer >
    );
};

/*
  getStableJitter:
  - Prevents overlapping markers by slightly offsetting markers
  - Ensures jitter is consistent across reloads using localStorage
*/
function getStableJitter(i, s) {
    // Each marker gets a unique ID like "jitter-0", "jitter-1", etc.
    const key = `jitter-${i}`;

    // Check if random jitter for this marker was already saved
    const saved = localStorage.getItem(key);
    if (saved) {
        // If yes → reuse the EXACT old jitter (prevents movement on reload)
        return JSON.parse(saved);
    }

    // If jitter is NOT saved, generate new random values
    const jitter = 0.1;  // controls how far apart the markers spread
    const value = {
        lat: s.lat + (Math.random() - 0.5) * jitter,
        lng: s.lng + (Math.random() - 0.5) * jitter
    };

    // Save this random jitter permanently in localStorage until cleared via localStorage.clear()
    localStorage.setItem(key, JSON.stringify(value));

    // Return the newly generated jitter
    return value;

    // Empty [] → run only ONCE for each marker
};
/*
  getSeverity:
  - Maps specific locations to a severity level
  - Used to determine marker icon
  - Fallback to 'low' if location not listed
*/
export function getSeverity(location) {
    const severityMap = {
        London: "high",
        Edinburgh: "high",
        Glasgow: "high",
        Southampton: "medium",
        Sheffield: "medium",
        Newcastle: "medium",
        Bristol: "medium",
        Cardiff: "medium",
        Leeds: "medium",
        Liverpool: "medium",
        Birmingham: "medium",
        Nottingham: "low",
        Leicester: "low",
        Manchester: "low"
    };
    return severityMap[location] || "low"; // fallback
}


export default Map;