// List of tick species available for selection in the dropdown
const speciesOptions = [
    "Southern rodent-Tick",
    "Marsh Tick (Sheep/Deer Tick)",
    "Hedgehog Tick",
    "Tree-hole Tick",
    "Fox/Badger Tick",
    "Unknown"
];

// List of UK cities with their coordinates (latitude and longitude)
// Used to automatically add coordinates to the report based on selected city
const cities = [
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Southampton", lat: 50.9097, lng: -1.4044 },
    { name: "Cardiff", lat: 51.4816, lng: -3.1791 },
    { name: "Bristol", lat: 51.4545, lng: -2.5879 },
    { name: "Birmingham", lat: 52.4862, lng: -1.8904 },
    { name: "Leicester", lat: 52.6369, lng: -1.1398 },
    { name: "Nottingham", lat: 52.9548, lng: -1.1581 },
    { name: "Sheffield", lat: 53.3811, lng: -1.4701 },
    { name: "Manchester", lat: 53.4808, lng: -2.2426 },
    { name: "Liverpool", lat: 53.4084, lng: -2.9916 },
    { name: "Leeds", lat: 53.7997, lng: -1.5492 },
    { name: "Newcastle", lat: 54.9783, lng: -1.6178 }
];
export { speciesOptions, cities };