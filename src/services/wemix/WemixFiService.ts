import axios from 'axios';
import https from 'https';

const WemixFiService = () => {
  const server = axios.create({
    baseURL: 'https://api.wemix.fi',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });

  const macroscope = {
    getToken: () => server.get('/macroscope/token'),
  };


  return {
    macroscope,
  };
};

export default WemixFiService;
