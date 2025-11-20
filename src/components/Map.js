import React from 'react';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import sightings from "../data/tickDataWithCoords.json"; // import the new json file with the function from geocode.js
import { useState } from 'react';
import fusedIcons from './markerIcons';

const Map = ({ onMarkerSelect }) => {
    console.log("First sighting object:", sightings[0]);

    return (
        <div>
            < MapContainer center={[51.505, -0.09]} zoom={6} scrollWheelZoom={true} style={{ height: "1000px", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {sightings.map((s, i) => {

                    // jitter to be added ONLY once per marker.
                    // useMemo ensures this code runs once and returns the SAME result forever.
                    const jittered = getStableJitter(i, s);
                    return (
                        <Marker
                            key={i}
                            position={[jittered.lat, jittered.lng]} // from my Excel file
                            icon={fusedIcons(getSeverity(s.location), sightings.date)} // Use the appropriate icon based on severity
                            eventHandlers={{
                                click: () => onMarkerSelect && onMarkerSelect(s),
                                mouseover: (e) => { e.target.openPopup(); },
                                mouseout: (e) => { e.target.closePopup(); }
                            }}
                        >
                            <Popup closebutton={false}>
                                <strong>{s.species}</strong><br />
                            </Popup>
                        </Marker>
                    );
                })
                }
            </MapContainer>
        </div >
    );
};


function getStableJitter(i, s) {
    // Each marker gets a unique ID like "jitter-0", "jitter-1", etc.
    const key = `jitter-${i}`;

    // Check if random jitter for this marker was already saved
    const saved = localStorage.getItem(key);
    if (saved) {
        // If yes → reuse the EXACT old jitter (prevents movement)
        return JSON.parse(saved);
    }

    // If jitter is NOT saved, generate new random values
    const jitter = 2.0;  // controls how far apart the markers spread
    const value = {
        lat: s.lat + (Math.random() - 0.5) * jitter,
        lng: s.lng + (Math.random() - 0.5) * jitter
    };

    // Save this random jitter permanently in localStorage
    localStorage.setItem(key, JSON.stringify(value));

    // Return the newly generated jitter
    return value;

    // Empty [] → run only ONCE for each marker
};
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