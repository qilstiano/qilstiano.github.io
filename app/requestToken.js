const axios = require('axios');
const querystring = require('querystring');

const client_id = 'bff7275e0bdc455f9e391f852ae9b9d7';
const client_secret = '92637b15be6944f38b0732f980e83760';
const redirect_uri = 'http://localhost:3000/callback';
const code = 'AQAE27n4ya07-VjPa6tXZEjt33wWON1gI3clywzfrAFUj3CNtbG6JfH9obvZkjU9nD4hY_WrP_sReOrtLFbUu4Hz2T6fKkaIBuTQ7WIEVIXMsfPTakHMnd5A-Ocus-W6lXwWr43MEXQ8xbIG3S8ZGUSuFzWyK2QRVK0s0Wkzisbfet3oFqjBZRSoIX2pgBKaWspY0bH7QoHgfPdq51viAQy7ILEa336_yxGsv-gi'; // Replace with the actual code you received

const tokenUrl = 'https://accounts.spotify.com/api/token';
const encodedClientIdAndSecret = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const data = querystring.stringify({
  grant_type: 'authorization_code',
  code: code,
  redirect_uri: redirect_uri,
});

const headers = {
  'Authorization': `Basic ${encodedClientIdAndSecret}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.post(tokenUrl, data, { headers })
  .then(response => {
    const { access_token, refresh_token } = response.data;
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    // Save the tokens for future use
  })
  .catch(error => {
    console.error('Error fetching tokens:', error.response.data);
  });
