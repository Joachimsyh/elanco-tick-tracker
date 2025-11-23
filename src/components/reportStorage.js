
export function saveNewReport(report) {
    const existing = JSON.parse(localStorage.getItem("userReports") || "[]");
    existing.push(report);
    localStorage.setItem("userReports", JSON.stringify(existing));
}

export function loadUserReports() {
    return JSON.parse(localStorage.getItem("userReports") || "[]");
}