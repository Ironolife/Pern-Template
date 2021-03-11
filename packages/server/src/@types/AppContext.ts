import DataLoader from 'dataloader';
import { Request, Response } from 'express';
import User from '../entities/User';

type AppContext = {
  req: Request;
  res: Response;
  user_id?: string;
  dataLoaders: {
    userLoader: DataLoader<string, User | undefined>;
  };
};

export default AppContext;
