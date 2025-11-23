import React, { useState } from 'react';

const ReportForm = ({ onReportSubmitted }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        species: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    const speciesOptions = [
        "Southern rodent-Tick",
        "Marsh Tick (Sheep/Deer Tick)",
        "Hedgehog Tick",
        "Tree-hole Tick",
        "Fox/Badger Tick",
        "Unknown"
    ];
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear message when user starts typing
        setMessage({ type: '', text: '' });
    };

    const validateForm = () => {
        // Check for empty fields
        if (!formData.date) {
            setMessage({ type: 'error', text: 'Please enter a date' });
            return false;
        }
        if (!formData.time) {
            setMessage({ type: 'error', text: 'Please enter a time' });
            return false;
        }
        if (!formData.location.trim()) {
            setMessage({ type: 'error', text: 'Please enter a location' });
            return false;
        }
        if (!formData.species) {
            setMessage({ type: 'error', text: 'Please select a species' });
            return false;
        }

        // Warning for future dates
        const selectedDate = new Date(formData.date);
        const today = new Date();
        if (selectedDate > today) {
            setMessage({ type: 'warning', text: 'Warning: Date is in the future. Are you sure?' });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Find lat/lng for the selected city
            const selectedCity = cities.find(c => c.name === formData.location);
            // Build the new report object
            const newReport = {
                species: formData.species,
                location: formData.location,
                date: formData.date,
                time: formData.time,
                lat: selectedCity.lat,
                lng: selectedCity.lng
            };

            // Save report in localStorage
            saveNewReport(newReport);

            // Show success message
            setMessage({ type: 'success', text: 'Sighting reported successfully!' });

            // Clear form
            setFormData({
                date: '',
                time: '',
                location: '',
                species: ''
            });

            if (onReportSubmitted) {
                onReportSubmitted();
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            setMessage({ type: 'error', text: 'Failed to fetch coordinates. Please try again.' });
        }
    };
    const messageStyles = {
        error: { backgroundColor: '#ffcccc', color: '#cc0000', padding: '10px', borderRadius: '4px', marginBottom: '10px' },
        warning: { backgroundColor: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '4px', marginBottom: '10px' },
        success: { backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '4px', marginBottom: '10px' }
    };

    return (
        <div className="report-form">
            <h2>Report a Tick Sighting</h2>

            {message.text && (
                <div style={messageStyles[message.type]}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Date:</label><br />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Time:</label><br />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Location:</label><br />
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Select city --</option>
                        {cities.map((city, i) => (
                            <option key={i} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Species:</label><br />
                    <select
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Select species --</option>
                        {speciesOptions.map((species, i) => (
                            <option key={i} value={species}>{species}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#2c5530',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
    function saveNewReport(report) {
        const saved = JSON.parse(localStorage.getItem("userReports") || "[]");
        saved.push(report);
        localStorage.setItem("userReports", JSON.stringify(saved));
    }
};

export default ReportForm;