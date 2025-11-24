import './App.css';
import Map, { getSeverity } from './components/Map';
import { RightSidebar, LeftSidebar } from './components/Sidebar';
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react';
import sightings from "./data/tickDataWithCoords.json"; // Default tick sightings data
import { loadUserReports } from "./components/reportStorage";
/* 
  App Component:
  - Root component of the application
  - Manages state for:
      1. activeTab → controls which tab is visible in LeftSidebar
      2. selectedMarker → stores the tick sighting selected on the map
*/
function App() {
  const [activeTab, setActiveTab] = useState("report");// Default tab: report
  const [selectedMarker, setSelectedMarker] = useState(null);// No marker selected initially
  const [allReports, setAllReports] = useState([]); // All tick sightings (default + user)

  // Load reports when component mounts
  useEffect(() => {
    refreshReports();
  }, []);

  // Function to refresh reports (merges default + user reports)
  const refreshReports = () => {
    const userReports = loadUserReports(); // Get user-submitted reports from localStorage
    setAllReports([...sightings, ...userReports]); // Merge default + user reports
  };

  return (
    <div className="App">
      {/* Left sidebar: About / Report tabs */}
      <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Map component:
                - onMarkerSelect is called when a marker is clicked
                - Updates selectedMarker state, triggering RightSidebar */}
      <Map reports={allReports} onMarkerSelect={setSelectedMarker} />
      {/* Right sidebar: shows detailed information about the selected marker */}
      <RightSidebar sighting={selectedMarker} onClose={() => setSelectedMarker(null)}
        severity={selectedMarker ? getSeverity(selectedMarker.location) : null}
        onReportClick={() => setActiveTab("report")} />
    </div>
  );
}

export default App;
