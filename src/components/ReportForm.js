import React, { useState } from 'react';
import { saveNewReport } from './reportStorage';
import { cities, speciesOptions } from './ReportFormChoices';
import { inputStyle, buttonStyle, messageStyles, formGroupStyle } from './FormStyles';

// ReportForm component - allows users to submit tick sightings
// Accepts onReportSubmitted callback to notify parent when a report is successfully submitted
const ReportForm = ({ onReportSubmitted }) => {
    // State to store form input values (date, time, location, species)
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        species: ''
    });

    // State to store validation/success messages with type (error, warning, success)
    const [message, setMessage] = useState({ type: '', text: '' });

    // Handle input changes - updates formData state when user types/selects
    // Also clears any existing error/success messages
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear message when user starts inputting again
        setMessage({ type: '', text: '' });
    };

    // Validate form before submission
    // Returns true if all fields are valid, false otherwise
    const validateForm = () => {
        // Set a minimum date for validation
        const minDate = new Date('2012-01-01');
        // Warning for future dates - prevents accidental incorrect date entry
        const selectedDate = new Date(formData.date);
        const today = new Date();
        // Check for empty fields
        if (!formData.date) {
            setMessage({
                type: 'error',
                text: 'Please enter a date'
            });
            return false;
        } else if (selectedDate < minDate) {
            setMessage({
                type: 'error',
                text: 'Please enter a date after January 1, 2012'
            });
            return false;
        }
        if (!formData.time) {
            setMessage({
                type: 'error',
                text: 'Please enter a time'
            });
            return false;
        }
        if (!formData.location) {
            setMessage({
                type: 'error',
                text: 'Please enter a location'
            });
            return false;
        }
        if (!formData.species) {
            setMessage({
                type: 'error',
                text: 'Please select a species'
            });
            return false;
        }
        if (selectedDate > today) {
            setMessage({
                type: 'warning',
                text: 'Warning: Date is in the future. Are you sure?'
            });
            return false;
        }
        const reportDateTime = new Date(`${formData.date}T${formData.time}`);
        const now = new Date();

        if (reportDateTime > now) {
            setMessage({
                type: 'warning',
                text: 'Warning: Date is in the future. Are you sure?'
            });
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission/page reload

        // Validate form before proceeding
        if (!validateForm()) {
            return;
        }

        try {
            // Find the coordinates (lat/lng) for the selected city
            const selectedCity = cities.find(c => c.name === formData.location);

            // Build the new report object with all data including coordinates
            const newReport = {
                species: formData.species,
                location: formData.location,
                date: formData.date,
                time: formData.time,
                lat: selectedCity.lat, // this is just for the selected cities in the list.
                lng: selectedCity.lng
            };

            // Save report to localStorage (acts as simple database)
            saveNewReport(newReport);

            // Show success message to user
            setMessage({ type: 'success', text: 'Sighting reported successfully!' });

            // Clear form fields after successful submission
            setFormData({
                date: '',
                time: '',
                location: '',
                species: ''
            });

            // Notify parent component that a report was submitted (optional callback)
            if (onReportSubmitted) {
                onReportSubmitted();
            }
        } catch (error) {
            // Handle any errors during submission
            console.error('Error fetching coordinates:', error);
            setMessage({ type: 'error', text: 'Failed to fetch coordinates. Please try again.' });
        }
    };

    return (
        <div className="report-form">
            <h2>Report a Tick Sighting</h2>

            {/* Display validation/success message if one exists */}
            {message.text && (
                <div style={messageStyles[message.type]}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Date input field */}
                <div style={formGroupStyle}>
                    <label>Date:</label><br />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={inputStyle}
                        min="2012-01-01"
                    />
                </div>

                {/* Time input field */}
                <div style={formGroupStyle}>
                    <label>Time:</label><br />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        style={inputStyle}
                    />
                </div>

                {/* Location dropdown - shows list of UK cities */}
                <div style={formGroupStyle}>
                    <label>Location:</label><br />
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        {/* Default placeholder option - empty value so form validation catches if nothing is selected */}
                        <option value="">-- Select city --</option>

                        {/* Loop through cities array and create an <option> for each city */}
                        {cities.map((city, i) => (
                            // key={i} helps React track each option efficiently
                            // value={city.name} is what gets stored in formData.location when selected
                            // {city.name} is what the user sees in the dropdown
                            <option key={i} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>

                {/* Species dropdown - shows list of tick species */}
                <div style={formGroupStyle}>
                    <label>Species:</label><br />
                    <select
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">-- Select species --</option>
                        {speciesOptions.map((species, i) => (
                            <option key={i} value={species}>{species}</option>
                        ))}
                    </select>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    style={buttonStyle}
                >
                    Submit Report
                </button>
            </form >
        </div >
    );

};


export default ReportForm;