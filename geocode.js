//a script to read tick sighting data from a JSON file,
//geocode the locations to get latitude and longitude using OpenStreetMap API,
//and save the updated data with coordinates back to a new JSON file.
//Import file system and node-fetch modules to read/write files and make API requests
import fs from 'fs';
import fetch from 'node-fetch';

// Read the existing JSON data file 
const rawData = fs.readFileSync('./src/data/tickData.json');
const sightings = JSON.parse(rawData); //parse JSON data into JS objects

/* 
  addLatLng Function:
  - Loops through each sighting and fetches latitude & longitude from OpenStreetMap Nominatim API
  - If API fails, assigns a default location
  - Demonstrates async/await, fetch API, and updating objects in an array
*/
async function addLatLng() {
    for (let s of sightings) {
        //fetch geocode data from OpenStreetMap Nominatim API
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${s.location}`
        );
        const data = await response.json(); //parse API response as JSON

        //If data is returned, set lat and lng properties on sighting object
        if (data[0]) {
            s.lat = parseFloat(data[0].lat);
            s.lng = parseFloat(data[0].lon);
        } else {
            s.lat = 51.505; //default lat and long if geocoding fails
            s.lng = -0.09;
        }
        console.log(`Added coords for ${s.location}: ${s.lat}, ${s.lng}`);
    }

    // Save the updated JSON back to a new file
    fs.writeFileSync('./src/data/tickDataWithCoords.json', JSON.stringify(sightings, null, 2));
    console.log('Updated JSON saved to tickDataWithCoords.json');
}

addLatLng();