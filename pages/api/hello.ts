import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from "fs";
import path from "path";
import formidable, { File } from 'formidable';

type Data = {
  status: number
  data: any
}

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const data = await new Promise(function (resolve, reject) {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    } catch (e) {
      res.status(400).send({ status: 400, data: 'none' });
    }
  }
}

