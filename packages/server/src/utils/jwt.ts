import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import jwks from 'jwks-rsa';

dotenv.config();

const client = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const validate = async (authorization: string): Promise<object | null> => {
  const token = authorization.split(' ')[1];

  return new Promise((res, rej) => {
    jwt.verify(
      token,
      async (header, callback) => {
        const key = await client.getSigningKey(header.kid!);
        callback(null, key.getPublicKey());
      },
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          rej(err);
        } else {
          res(decoded || null);
        }
      }
    );
  });
};

export default validate;
