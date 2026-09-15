// figure out backend url based on where site is running
var API_URL = 'http://localhost:4000';

if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  API_URL = 'https://airbnb-final-production-661e.up.railway.app';
}

export default API_URL;
