import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let query = Object.keys(req.query)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(req.query[k] as string))
      .join('&');

    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_WEMIXFI_API}/history/token?${query}`);
    const data = await response.json();

    res.status(200).json(data.data);
  } catch (e) {
    console.log(e);
    res.status(404);
  }
}
