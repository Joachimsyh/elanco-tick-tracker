export function loadUserReports() {
    return JSON.parse(localStorage.getItem("userReports") || "[]");
}
// Helper function to save new report to localStorage
// Retrieves existing reports, adds new one, saves back to localStorage
export function saveNewReport(report) {
    // Get existing reports from localStorage (or empty array if none exist)
    const saved = JSON.parse(localStorage.getItem("userReports") || "[]");
    // Add new report to the array
    saved.push(report);
    // Save updated array back to localStorage
    localStorage.setItem("userReports", JSON.stringify(saved));

}