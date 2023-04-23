import axios from 'axios';

export default function handler(req, res) {
  axios
    .get(`https://api.wemix.fi/wdollar/price`)
    .then(({ data, status }) => {
      res.status(status).json(data.data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
}
