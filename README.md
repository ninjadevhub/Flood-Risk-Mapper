# Next.js Flood Zone Visualization Application

This project is a Next.js (version 15) application designed to
visualize FEMA flood risk zones (e.g., 100-year and 500-year zones)
using Mapbox. The app allows users to explore flood zones on an
interactive map, click on specific zones to display detailed information
in a popup, and toggle between different zones using a sidebar.

## Prerequisites

• Node.js: v18 (required) • NPM: Make sure to use the latest version
compatible with Node.js 18.

Getting Started

1\. Installation

 1. Clone the repository:

git clone \<repository-url\>

2. Navigate to the project directory:

cd flood-risk-app

3. Install dependencies:

npm install

2\. Environment Configuration

The application requires some environment variables for Mapbox
integration.

For now, environment variables are included in the .env file in the
repository for the purpose of performing a demo. Ideally, these keys
should be part of a secure CI/CD pipeline, but this is a temporary
arrangement.

.env File Contents:

NEXT_PUBLIC_MAPBOX_TOKEN=\<your-mapbox-access-token\>
NEXT_PUBLIC_MAP_API_BASE_URL=\<your-mapbox-base-api-url\>

⚠️ Note: Replace \<your-mapbox-access-token\> with your actual Mapbox
token. This setup is only for demo purposes.

3\. Running the Application

 1. Development Mode:

npm run dev

The application will start on http://localhost:3000.

2. Build for Production:

npm run build

Then, start the application:

npm start

Features

 1. Interactive Map: • Visualizes flood zones (100-year and 500-year)
with distinct colors: • Red: 100-year flood zones • Blue: 500-year flood
zones • Green: Other zones or unknown categories 2. Popup on Zone Click:
• Clicking on a zone displays detailed information about the flood zone
in a popup. 3. Dynamic Zone Assignment: • Flood zones are randomly
assigned during rendering (e.g., 100-year or 500-year zones). The data
may change on each preview, but the functionality remains consistent. 4.
Mapbox Integration: • Map style optimized for clear visibility of flood
zones. 5. Future Improvements: • Better file separation. • Improved
coding standards.

Known Limitations

• Random Data Assignment: The flood zones are randomly assigned for demo
purposes. This behavior might not reflect real-world data but
demonstrates the application's functionality. • Environment Keys in
Repo: Currently, the environment keys are pushed to the repository.
These should be managed securely through a pipeline in the future.

Folder Structure

src/ 
├── components/ \# Reusable components (e.g., Map, Sidebar, Popups)
├── contexts/ \# React Contexts for state management (e.g., selected zones) 
├── app/ \# Next.js pages 
├── styles/ \# Tailwind CSS files 
├── utils/ \# Helper functions and constants

Usage

 1. Open the application in a browser. 2. Interact with the map to
explore flood zones. 3. Click on a zone to display its details in a
popup. 4. Use the sidebar to toggle between flood zone types (e.g.,
100-year and 500-year).

Future Enhancements

• Secure Environment Keys: Transition to a CI/CD pipeline for secure
environment variable management. • Enhanced Codebase: Introduce better
file separation and adhere to coding standards for maintainability and
scalability. • Realistic Zone Data: Replace random data assignments with
real-time or static data for better accuracy.

Troubleshooting

• Map Not Loading: Ensure the NEXT_PUBLIC_MAPBOX_TOKEN in the .env file
is valid. • Node Version Mismatch: Use Node.js v18. Check your version
with node -v.

