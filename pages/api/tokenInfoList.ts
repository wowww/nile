import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import https from 'https';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_ENV_WEMIXFI_API}/token/info_list?token=${req.query.token ?? 'all'}`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    const data = await response.data;


    res.status(200).json(data.data);
  } catch (e) {
    console.log(e);
    res.status(404);
  }
}
