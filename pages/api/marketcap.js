import axios from 'axios';

export default function handler(req, res) {
  axios
    .get(
      'https://explorerapi.wemix.com/api/v1/coinmarketcap/cryptocurrency/quotes/latest?symbol=WEMIX',
    )
    .then(({ data, status }) => {
      res.status(status).json(data.data);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
}
