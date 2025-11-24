import React from 'react';
import speciesInfo from './TickSpecies';


/*
  AboutTicks component:
  - Functional component that displays information about UK tick species
  - Uses the speciesInfo array to dynamically generate content
  - Demonstrates use of map() for rendering lists in React
  - Includes basic JSX for headings, paragraphs, and images
  - Provides an extra "Prevention Methods" section
*/
const AboutTicks = () => {
    return (
        <div className="about-ticks">
            <h2>UK Tick Species</h2>
            {speciesInfo.map((tick, index) => (
                <div key={index}>
                    <h3>{tick.name}</h3>
                    <img
                        src={tick.imageURL}
                        alt={tick.name}
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <p><strong>Description:</strong> {tick.description}</p>
                    <p><strong>Diseases:</strong> {tick.diseases}</p>
                    <p><strong>Activity & Habitat:</strong> {tick.activity}</p>
                    <hr />
                </div>
            ))}

            <h2>Prevention Methods</h2>
            <p><strong>Wear protective clothing:</strong> Long sleeves, trousers tucked into socks in grassy/wooded areas.</p>
            <p><strong>Use repellent:</strong> DEET-based sprays on skin and permethrin on clothing.</p>
            <p><strong>Stick to paths:</strong> Avoid walking through tall grass and dense vegetation.</p>
            <p><strong>Check yourself:</strong> Inspect your body and pets after outdoor activities.</p>
            <p><strong>Remove promptly:</strong> Use fine-tipped tweezers, grasp close to skin, pull steadily upward.</p>
            {/* Decorative horizontal line */}
            <hr style={{ border: 'none', height: '3px', backgroundColor: '#333' }} />
        </div>
    );
};


export default AboutTicks;