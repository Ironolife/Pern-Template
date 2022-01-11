// Load environment variables before anything else
import dotenv from 'dotenv';
dotenv.config();

// Load other imports
import { app } from '#server/libs/app';

const main = async () => {
  const port = parseInt(process.env.PORT, 10);

  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
};

main();
