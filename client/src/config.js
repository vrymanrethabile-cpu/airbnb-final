// figure out backend url based on where the app is running
const API_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:4000'
    : 'https://airbnb-final-i1f8.vercel.app';

// use new API endpoints
export const ACCOMMODATIONS_URL = API_URL + '/api/accommodations';
export const RESERVATIONS_URL = API_URL + '/api/reservations';

export default API_URL;
