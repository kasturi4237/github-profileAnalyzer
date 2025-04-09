# GitHub Profile Analyzer

A React application that allows users to analyze GitHub profiles and repositories using the GitHub API.

## Features

- Search for GitHub users by username
- View a user's top repositories with details such as:
  - Repository name and description
  - Star count
  - Fork count
  - Programming language
- Display a visualization of commit activity (sample data for demonstration)
- Responsive design that works on mobile and desktop devices

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Lucide React for icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository or extract the zip file
   ```
   git clone https://github.com/yourusername/github-profile-analyzer.git
   ```

2. Navigate to the project directory
   ```
   cd github-profile-analyzer
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

## Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
2. Install the Vercel CLI
   ```
   npm install -g vercel
   ```
3. Log in to Vercel
   ```
   vercel login
   ```
4. Deploy the application
   ```
   vercel
   ```
5. Follow the prompts and your application will be deployed

### Option 2: Deploy to Netlify

1. Create a Netlify account at [netlify.com](https://netlify.com) if you don't have one
2. Build the application
   ```
   npm run build
   ```
3. Install the Netlify CLI
   ```
   npm install -g netlify-cli
   ```
4. Deploy the application
   ```
   netlify deploy
   ```
5. Follow the prompts, and when asked for the publish directory, enter `build`

### Option 3: Deploy to GitHub Pages

1. Install the gh-pages package
   ```
   npm install --save-dev gh-pages
   ```
2. Add the following to your `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/github-profile-analyzer",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```
3. Deploy the application
   ```
   npm run deploy
   ```

## Usage

1. Enter a GitHub username in the search box
2. Click the "Analyze" button
3. View the user's top repositories and commit activity chart
4. Click on repository links to view them on GitHub

## GitHub API Rate Limits

Please note that the GitHub API has rate limits:
- For unauthenticated requests: 60 requests per hour
- For authenticated requests: 5,000 requests per hour

This application uses unauthenticated requests, so you may experience rate limiting if you perform many searches.

## Potential Improvements

- Add authentication to increase API rate limits
- Implement pagination for users with many repositories
- Add more detailed analytics and visualizations
- Include user profile information
- Add actual commit data fetching (would require multiple API calls)

## License

This project is licensed under the MIT License.

## Author

Your Name

---

Thank you for reviewing my GitHub Profile Analyzer application. If you have any questions or need further assistance, please feel free to contact me.