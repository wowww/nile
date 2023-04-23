import axios from 'axios';
import { camelizeKeys } from 'humps';

const UpbitApiService = () => {
  const server = axios.create({
    baseURL: 'https://quotation-api-cdn.dunamu.com',
  });

  server.interceptors.response.use((response) => ({
    ...response,
    data: camelizeKeys(response.data),
  }));

  const v1 = {
    ticker: () => server.get('/v1/ticker', { params: { markets: 'KRW-WEMIX' } }),
  };

  return {
    v1,
  };
};

export default UpbitApiService;
