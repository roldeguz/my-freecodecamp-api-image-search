FreeCodeCamp: URL Shortener Microservice
=========================

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link.

Create: 
<br />https://roldeguz-url-shortener.glitch.me/new/http://www.google.com 
<br />https://roldeguz-url-shortener.glitch.me/new/http://www.reddit.com
<br /><br />
Output: 
<br />{ "original_url":"http://www.google.com", "short_url":"https://roldeguz-url-shortener.glitch.me/57112" } 
<br />{ "original_url":"http://www.reddit.com", "short_url":"https://roldeguz-url-shortener.glitch.me/87565" }
<br /><br />
Usage: 
<br />https://roldeguz-url-shortener.glitch.me/57112 will redirect to http://www.google.com 
<br />https://roldeguz-url-shortener.glitch.me/87565 will redirect to http://www.reddit.com
<br /><br />
27-June-2017, roldeguz
