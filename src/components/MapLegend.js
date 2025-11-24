import React from "react";
/*
  MapLegend Component:
  - Displays a floating legend on the map to explain marker colors and opacities.
  - Provides users a clear understanding of severity levels and how recent the report is.
  - Styled inline for simplicity; could also be moved to a CSS file.
*/
export function MapLegend() {
    return (
        <div style={{
            position: 'absolute',      // Absolute positioning to float over the map
            top: "20px",               // Distance from the top of the map container
            right: "10px",             // Distance from the right side of the map container
            background: "white",       // White background for readability
            padding: "15px",           // Inner spacing
            borderRadius: "10px",      // Rounded corners for a card-like look
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)", // Slight shadow for depth
            zIndex: 1000,              // Ensure it appears above map elements
            width: "180px",            // Fixed width
            fontSize: "14px"           // Font size for readability
        }}>
            <strong>Map Legend</strong>
            <hr />

            <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "red", fontWeight: "bold" }}>● High</span> severity
            </div>
            <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "orange", fontWeight: "bold" }}>● Medium</span> severity
            </div>
            <div style={{ marginBottom: "6px" }}>
                <span style={{ color: "green", fontWeight: "bold" }}>● Low</span> severity
            </div>

            <hr />

            <div><strong>Opacity Guide:</strong></div>
            <div style={{ marginTop: "6px" }}>1.0 — Recent (≤ 1 year)</div>
            <div>0.85 — 1-2 years</div>
            <div>0.70 — 2-3 years</div>
            <div>0.55 — 3-6 years</div>
            <div>0.40 — 6-9 years</div>
            <div>0.25 — 9-12 years</div>
            <div>0.12 — Very old</div>
        </div>
    );
}