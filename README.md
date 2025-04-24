# Crowdcube: A Crowdfunding Platform

## Live Website:
[**Live Site Link**](https://crowd-funding-applicatio-5b03c.web.app/) 

## Description:
Crowdcube is a dynamic crowdfunding platform where users can create campaigns, contribute donations, and support various causes such as personal needs, creative ideas, and business startups. Users can create, view, and donate to ongoing campaigns, with a seamless, responsive interface ensuring an engaging experience on both mobile and desktop devices.

## Key Features:
- **User Authentication**: Secure email/password login system, with Google or GitHub login options.
- **Campaign Creation**: Logged-in users can create new campaigns with detailed information like title, type, description, minimum donation, and deadline.
- **Campaign Viewing**: Users can explore various campaigns, read more details, and contribute through donations.
- **User Dashboard**: View and manage your campaigns and donations in a personalized dashboard.
- **Sorting & Filtering**: Sort campaigns based on minimum donation amount in ascending or descending order.
- **Responsive Design**: Fully responsive interface for a smooth experience on all devices (mobile, tablet, desktop).
- **Dark/Light Mode**: Toggle between dark and light themes for better accessibility and personalization.
- **Error Handling**: User-friendly error messages and success alerts using Toast/Sweet Alerts.

## Tech Stack:
- **Frontend**: React.js, Tailwind CSS, Firebase Authentication
- **Backend**: Node.js, Express.js, MongoDB
- **Hosting**: Netlify (Client-side), Vercel (Server-side)
- **Other Libraries**: React Router, React Tooltip, Lottie React, React Simple Typewriter

## Installation Instructions:

### Client-Side:
1. Clone the client-side repository:
    ```bash
    git clone https://github.com/Mahabub2030/A-Crowd-Funding-Application
    ```
2. Navigate to the project folder:
    ```bash
    cd crowdcube-client
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the application:
    ```bash
    npm start
    ```
5. Visit [http://localhost:5000](https://server-hpg90ln92-mahabub2030s-projects.vercel.app) to view the app.

### Server-Side:
1. Clone the server-side repository:
    ```bash
    git clone https://github.com/yourusername/crowdcube-server
    ```
2. Navigate to the project folder:
    ```bash
    cd crowdcube-server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add your Firebase config and MongoDB credentials:
    ```bash
    FIREBASE_API_KEY=your-api-key
    MONGODB_URI=your-mongodb-uri
    ```
5. Start the server:
    ```bash
    npm start
    ```

## Environment Variables:
Make sure to add the following in your `.env` file:
- `FIREBASE_API_KEY` - Your Firebase API Key
- `MONGODB_URI` - MongoDB connection URI

## GitHub Commits:
- At least **15 commits** on the client-side.
- At least **8 commits** on the server-side.

## Screenshots:
1. **Home Page**:
   ![Home Page Screenshot](#) *(Insert image link here)*
2. **Login Page**:
   ![Login Page Screenshot](#) *(Insert image link here)*
3. **Campaign Details**:
   ![Campaign Details Screenshot](#) *(Insert image link here)*

## Challenges Overcome:
- **Responsive Design**: Ensured the application is fully responsive, adjusting seamlessly across various screen sizes.
- **Authentication**: Implemented secure authentication with Firebase, enabling both email/password and third-party logins (Google/GitHub).
- **Donation System**: Successfully set up a donation system that links campaigns to users and stores donation records.
- **Dynamic Campaign Pages**: Integrated dynamic pages that display campaign details, and handle donations securely.

## Future Improvements:
- Implement email verification and password reset functionality.
- Expand search/filter functionality for campaigns.
- Add additional payment gateways for donations.

---

### License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
