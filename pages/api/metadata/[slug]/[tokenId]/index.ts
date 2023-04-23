import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';
import { runMiddleware } from '@utils/routes';

const cors = Cors({
  methods: ['GET'],
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { slug, tokenId } = query;

  runMiddleware(req, res, cors).then(() => {
    switch (method) {
      case 'GET':
        axios.get(`${process.env.NEXT_PUBLIC_ENV_CDN_URL}/metadata/${slug}/${tokenId}.json`).then(({ data, status }) => {
          res.status(status).json(data);
        }).catch(({ status, message }) => {
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
