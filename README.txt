============================
Jay Blankenship Portfolio - Build & Deploy Instructions
============================

## Local Development

1. Install dependencies:
	npm install

2. Add your Google Analytics ID to a `.env` file:
	GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

3. Build the site:
	node build.js

4. Serve the output folder locally:
	npx serve _site
	(or install serve globally: npm install -g serve)

5. Open http://localhost:3000 in your browser.

## Netlify Deployment

1. Set build command to:
	node build.js

2. Set publish directory to:
	_site

3. Add your Google Analytics ID as an environment variable in Netlify:
	GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

## Security

- The `.env` file and `_site/` folder are ignored by git for privacy and security.
- Never commit your real Google Analytics ID to the repository.

