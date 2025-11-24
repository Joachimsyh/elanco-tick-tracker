Throughout this project, I encountered several interesting challenges that taught me a lot.

# Marker Overlap:
 When I first added random jitter using Math.random, the positions kept changing on every re-render. I solved this by storing the jitter values in localStorage togenerate them once, save them, then reuse them. This taught me about state persistence and ensuring consistency in the UI.

# Form Validation: 
I’ve also used localStorage as a lightweight database for new information for this project. Implementing validation required thinking about good user experience — error, warning, and success messages appear at the right time, and they clear as soon as the user resumes typing.” 

# Form dropdowns:
“Originally, I wanted users to type any location, but that would require full geocoding support — handling misspellings, ambiguous places, and API limits.
Given the 7-day window, I made a realistic decision to use 12 predefined UK cities with known coordinates.
This kept the feature reliable while still meeting the core requirements.

# Time Management:
With only 7 days, I had to prioritise features carefully.
One example was image uploads — the requirements mentioned letting users attach photos of ticks, but implementing secure file handling and cloud storage would have taken too long.
Instead, I focused on delivering the core functionality — the map, the reporting system, and the educational content — to a polished level.

# Map jittering reset:
One very interesting technical challenge was having my map markers being all jumbled up together. I originally was thinking about doing a summarizing count for each marker within a location, but that really wouldn’t visually show to a user how many tick cases were reported unless I hover or click onto the markers on the map. So I went for a jitter function that spreads the coordinates within a reasonable radius so the markers are more visually cued. It also helped me think of coding in the opacity around the area to show the recency of these reports so people will see most of the information through visuals alone.

# CSS scrolling issue:
Another challenge was the CSS overflow issue. The map had fixed pixel dimensions which made the entire page scrollable. I debugged this by understanding the CSS box model—margin, padding, border, and content. By setting margins and padding to zero and overflow to hidden, I contained everything within the viewport for a better user experience."

# localStorage:
Because this project is an MVP without a backend database, I've decided to have user-submitted tick reports are stored locally using the browser’s built-in localStorage. That way I can use the browser's saved information to merge with the JSON file to create a new generated report that loops through the map functions to implement new tick report markers into the map and have it show.