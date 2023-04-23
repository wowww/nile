import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';
import { IncomingForm } from 'formidable';
import * as fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  methods: ['POST'],
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  runMiddleware(req, res, cors).then(() => {
    const request = () => {
      const form = new IncomingForm();

      form.parse(req, async (err, fields, files: any) => {
        const bufferImage = fs.readFileSync(files.files.filepath);

        axios.post('https://image-file-uploader.azurewebsites.net/api/imageuploader?code=0HUH-B8zHyW4FG7dcVlPFlgClrB3wR_0dJKU7J5w6G1BAzFukoBhsA%3D%3D', bufferImage, {
          params: {
            filename: `apply/${files.files.originalFilename}`,
            filetype: files.files.mimetype,
            container_name: 'market',
          },
        })
          .then((response) => {
            console.log('response', response);
            res.status(200).send(response.data);
          })
          .catch((error) => {
            console.log('error', error);
            if (error.response) {
              res.status(error.response.status).end(error.response.data.message);
            } else {
              res.status(500).end(error.message);
            }
          });
      });
    };

    switch (method) {
      case 'POST':
        request();
        break;
      case 'OPTION':
        res.status(200);
        break;
      default:
        res.setHeader('Allow', ['GET', 'OPTION']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  });
}
