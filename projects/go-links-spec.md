# Go Links

Project: Internal Go Links Service
Build a complete internal URL shortening service that allows users to access shortcuts via go/shortcutname on their local network.
Tech Stack:

Backend: Deno with TypeScript
Frontend: React with TypeScript
Storage: SQLite or JSON file
Single repository with clear folder structure

Requirements:
Backend (Deno):

HTTP server listening on port 80 (or 3000 with instructions to proxy from 80)
RESTful API endpoints:

GET /:shortcut - Redirect to full URL or return 404 page
GET /api/shortcuts - List all shortcuts (with search/filter support)
POST /api/shortcuts - Create new shortcut (body: {shortcut: string, url: string, description?: string})
PUT /api/shortcuts/:shortcut - Update existing shortcut
DELETE /api/shortcuts/:shortcut - Delete shortcut


Data persistence using SQLite or JSON file
CORS enabled for development
Validation: ensure URLs are valid, shortcuts are alphanumeric with hyphens allowed
Serve the React frontend as static files from the build directory
Optional: Basic auth or no auth (for trusted network)

Frontend (React + TypeScript):

Admin interface accessible at / or /admin
Features:

Table view of all shortcuts with columns: shortcut name, destination URL, description, edit/delete actions
Search/filter functionality
"Add New Shortcut" form with fields: shortcut name, destination URL, optional description
Inline editing or modal for updates
Copy shortcut URL to clipboard button
Responsive design (works on mobile)


Use a modern styling approach (Tailwind CSS or simple CSS modules)
Handle loading states and error messages

Additional Features:

Include a 404 page when shortcut doesn't exist with link back to admin
Welcome page at root that lists popular/recent shortcuts
Export/import shortcuts as JSON for backup
Analytics: track usage count for each shortcut (optional but nice)

DNS Setup Instructions:
Include a README with:

How to configure dnsmasq, Pi-hole, or router DNS to resolve go to the server IP
How to run the Deno server
How to build and deploy the React frontend
Example dnsmasq config: address=/go/192.168.1.100

Deliverables:

Complete working implementation with clear folder structure
README with setup instructions
Example shortcuts data for testing
Docker/Docker Compose setup (optional but appreciated)

Create the full implementation with all code, configuration files, and documentation needed to deploy this service on a local network.