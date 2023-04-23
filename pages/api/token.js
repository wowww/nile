import axios from 'axios';
import https from 'https';

export default function handler(req, res) {
  axios
    .get('https://api.wemix.fi/macroscope/token', {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(({
      data,
      status,
    }) => {
      res.status(status).json(data.data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
}
