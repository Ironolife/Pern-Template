import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { IS_PROD } from '@pern-template/constants';
import AppContext from './@types/AppContext';
import UserResolver from './resolvers/user/user';
import createDataLoader from './utils/createDataLoader';
import User from './entities/User';

dotenv.config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
    migrationsRun: true,
    synchronize: !IS_PROD,
    logging: !IS_PROD,
  });

  const app = express();

  app.set('trust proxy', 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }): AppContext => ({
      req,
      res,
      dataLoaders: {
        userLoader: createDataLoader(User, 'id'),
      },
    }),
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.get('/version', async (_, res) => {
    res
      .status(200)
      .send(process.env.npm_package_version || process.env.VERSION);
  });

  const port = parseInt(process.env.PORT, 10);
  app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
  });
};

main();
