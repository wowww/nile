import axios from 'axios';

const DunamuCdnService = () => {
  const server = axios.create({
    baseURL: 'https://quotation-api-cdn.dunamu.com',
  });

  const v1 = {
    forex: {
      recent: () => server.get('/v1/forex/recent', { params: { codes: 'FRX.KRWUSD' } }),
    },
  };

  return {
    v1,
  };
};

export default DunamuCdnService;
