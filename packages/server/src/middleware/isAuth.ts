import { MiddlewareFn } from 'type-graphql';
import AppContext from '../@types/AppContext';

const isAuth: MiddlewareFn<AppContext> = async ({}, next) => {
  return next();
};

export default isAuth;
