import React from 'react';
import './sidebar.css';
import { getSeverity } from './Map';// Function to calculate severity of ticks based on location

// Import reusable components for content in the left sidebar
import AboutTicks from "./AboutTicks.js";
import ReportForm from "./ReportForm";
/* 
  RightSidebar Component:
  - Shows detailed information about a selected tick sighting
  - Props:
    1. sighting → object containing selected marker data (species, location, date, etc.)
    2. onClose → function to close the sidebar
    3. onReportClick → function to switch to report tab in left sidebar
*/
export const RightSidebar = ({ sighting, onClose, onReportClick }) => {
    return (
        // Apply 'open' class only if a sighting exists (used for sliding CSS animation)
        <div className={`right-sidebar ${sighting ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>-</button>
            {/* Only show content if a sighting is selected, if not, show nothing(null) */}
            {!sighting ? (
                null
            ) : (
                <div className="content">
                    <h2>Tick Information</h2>
                    <p><strong>Species: {sighting.species}</strong></p>
                    <p><strong>Latin Name:</strong> {sighting.latinName}</p>
                    <p><strong>Location:</strong> {sighting.location}</p>
                    <p><strong>Severity:</strong> {getSeverity(sighting.location)}</p>
                    <p><strong>Last Reported:</strong> {sighting.date}</p>
                    <button onClick={onReportClick}>Report</button>
                    <button>Get Directions</button>
                    <button>Share</button>
                </div>
            )}
        </div>
    );
};
/* LeftSidebar Component:
- Displays tabs for 'About Ticks' and 'Report'
    - Props:
    1. activeTab → current tab selected
2. setActiveTab → function to change tab
    - Demonstrates conditional rendering based on state
        */
export const LeftSidebar = ({ activeTab, setActiveTab, onReportSubmitted }) => {
    return (
        <div className="left-sidebar">
            {/* Tabs to switch content */}
            <div className="left-sidebar-tabs">
                <button onClick={() => setActiveTab("about")}>About Ticks</button>
                <button onClick={() => setActiveTab("report")}>Report</button>
            </div>
            {/* Conditional rendering of tab content */}
            <div className="left-sidebar-content">
                {activeTab === "about" && <AboutTicks />}
                {activeTab === "report" && <ReportForm onReportSubmitted={onReportSubmitted} />}
            </div>
        </div>
    );
};