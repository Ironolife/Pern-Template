import { app } from '#server/libs/app';
import dotenv from 'dotenv';
import xor from 'lodash/xor';

dotenv.config();

const main = async () => {
  const port = parseInt(process.env.PORT, 10);

  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
};

main();
