# **App Name**: ScriptGuardian

## Core Features:

- Service Availability Check: Provides a simple endpoint (/api/check) to verify the server's operational status.
- User Authorization: Validates user access via unique IDs through the /api/check/<user_id> endpoint.
- Data Validation: Enables comprehensive data validation via POST requests to /api/validate, ensuring data integrity. The validation tool can check time based access and version.
- Service Toggle: Allows administrators to enable or disable the entire service using the /admin/toggle endpoint.
- User Management: Provides admin controls to manage user permissions, enabling actions such as enabling, disabling, promoting or demoting specific user IDs using /admin/users/<user_id>/<action>.
- Server Status Display: Presents a public-facing status report on server conditions via the /status endpoint, using color coded indicators.
- Response Formatting: Formats all API responses as JSON to facilitate parsing in GameGuardian scripts, ensuring seamless data exchange.

## Style Guidelines:

- Primary color: Midnight Blue (#2C3E50) to evoke trust and security.
- Background color: Light Gray (#EAECEE), nearly white, for a clean interface.
- Accent color: Sky Blue (#3498DB) for interactive elements, providing clear call-to-action cues.
- Font: 'Inter', a sans-serif font, providing a modern, readable interface suitable for both headlines and body text. 
- Utilize sharp, vector-based icons that clearly represent function within GameGuardian, avoiding any ambiguity.
- A simple layout provides status notifications, each colored in the status of each aspect of GameGuardian.
- Subtle animations may appear when statuses change.