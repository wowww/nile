import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(StatusCodes.OK)
    .end(JSON.stringify({
      uptime: process.uptime(),
      message: 'ok',
      timestamp: Date.now(),
    }));
}
