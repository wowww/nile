import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { runMiddleware } from '@utils/routes';

const cors = Cors({
  methods: ['GET'],
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  runMiddleware(req, res, cors).then(() => {
    switch (method) {
      case 'GET':
        axios
          .get('https://www.papyrus.im/api/openAPI/landing/channel/list')
          .then(({ data, status }) => {
            res.status(status).json(data);
          })
          .catch(({ status, message }) => {
            res.status(status).end(message);
          });
        break;
      case 'OPTION':
        res.status(StatusCodes.OK);
        break;
      default:
        res.setHeader('Allow', ['GET', 'OPTION']);
        res.status(StatusCodes.METHOD_NOT_ALLOWED).end(`Method ${method} Not Allowed`);
        break;
    }
  });
}
