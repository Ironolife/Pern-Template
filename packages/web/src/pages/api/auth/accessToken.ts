import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';

const accessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.status(200).send(accessToken);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
};

export default accessToken;
