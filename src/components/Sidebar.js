import React from 'react';
import './sidebar.css';
import { getSeverity } from './Map';

// Sidebar component receives two props:
// 1. `sighting` → the selected marker data to display
// 2. `onClose` → a function to close the sidebar
const Sidebar = ({ sighting, onClose }) => {
    return (
        // If a sighting exists, 'open' is added → triggers CSS to slide the sidebar in
        <div className={`sidebar ${sighting ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            {!sighting ? (
                null
            ) : (
                <div className="content">
                    <h2>{sighting.species}</h2>
                    <p><strong>Latin Name:</strong> {sighting.latinName}</p>
                    <p><strong>Location:</strong> {sighting.location}</p>
                    <p><strong>Severity:</strong> {getSeverity(sighting.location)}</p>
                    <p><strong>Date:</strong> {sighting.date}</p>
                    <button>Report</button>
                    <button>Get Directions</button>
                    <button>Share</button>
                </div>
            )}
        </div>
    );
};
export default Sidebar;