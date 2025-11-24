# Elanco Tick Tracker

**Student Name:** Yu Hang Joachim Sin
**University:** Brunel University of London

---

## Project Overview

This is a Minimum Viable Product (MVP) web application built for the **Elanco 2026 Placement Task**.  
The application visualizes tick sightings across the UK, helping users identify high-risk areas and contribute to tick reporting.  
It includes interactive maps, species information, and a form to report sightings, aimed at improving public awareness of tick-borne diseases.

---

## Features Implemented (Core Requirements)

### 1. Interactive Map Visualisation
- Dynamic map interface displaying tick sightings across the UK. 
- Markers with visual indicators for:
  - **Severity:** low=green, medium=yellow, high=red (logically assigned based on location type)  
  - **Recency:** sightings <2 years → white outline; 3-9 years → increasingly faded outline; 10-12 years → barely visible to no outline 

### 2. Sighting Information
- Sidebar panel showing detailed sighting information when a user clicks a map marker, including:  
  - Species  
  - Latin name  
  - Severity  
  - Date and location 
- Quick action buttons: Report a sighting, Get Directions, Share 

### 3. Education Content
- Species identification guide showing:  
  - Species name  
  - Latin name  
  - Small image 
  - Prevention tips 

### 4. Report a Sighting
- Form to report a new sighting (date, time, location, species). 
- Form validation with success, warning, and error messages 

> ⚠️ *Other features (e.g., filter controls, timeline view, seasonal charts, image upload) were not implemented in the MVP.*

---

## Technical Stack
- **Frontend:** React, React Router DOM  
- **Mapping:** Leaflet.js  
- **Data:** `tick_data.json`  
- **Styling:** CSS Modules / standard CSS 

---

## CHALLENGES.md states the challenges I had to deal with while learning React and developing this project at the same time.

---
## Walkthrough of the video:
[Walkthrough](https://youtu.be/wOT3WumPDI8)

## How to Run the Project

1. Clone the repo:

```bash
git clone https://github.com/Joachimsyh/elanco-tick-tracker.git