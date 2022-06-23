import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';


type Data = {
  status: number
  data: any
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const path = require("path")
  const form = formidable({ multiples: true });
  await new Promise(() => {
    if (req.url === '/api/hello' && req.method === 'POST') {
      form.parse(req, function (err, fields, files) {
        if (err) {
          res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
          return res.end(String(err));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        initializeBundlr()
        // res.end(JSON.stringify({ files }, null, 2));
        res.status(200)
      });
    }
    // res.writeHead(200, { 'Content-Type': 'text/html' });
  })
}

const initializeBundlr = async () => {
  
}

