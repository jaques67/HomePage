# Homepage with Dynamic Unsplash Backgrounds

A simple homepage that displays a personalized greeting with beautiful background images from Unsplash that change every 6 hours.

## Setup

1. Clone this repository
2. Copy `config.example.js` to a new file named `config.js`:
   ```bash
   cp config.example.js config.js
   ```
3. Sign up for an Unsplash Developer account at https://unsplash.com/developers
4. Create a new application to get your API access key
5. Edit `config.js` and replace `your_access_key_here` with your actual Unsplash API access key

## Usage

Simply open `index.html` in your web browser. No server required!

## Security Notes

- Never commit your `config.js` file to version control
- The `config.js` file is listed in `.gitignore` to prevent accidental commits
- Make sure your Unsplash API key is kept private
