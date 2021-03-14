import { MiddlewareFn } from 'type-graphql';
import AppContext from '../@types/AppContext';
import User from '../entities/User';
import validate from '../utils/jwt';

const isAuth: MiddlewareFn<AppContext> = async ({ context }, next) => {
  const { authorization } = context.req.headers;
  if (!authorization) throw new Error('Missing authorization header.');

  const result = (await validate(authorization)) as any;

  // Insert or update
  const user = User.create({
    id: result.sub,
    email: result[`${process.env.AUTH0_CLAIMS_NAMESPACE}email`],
  });
  await User.save(user);

  context.user_id = user.id;

  return next();
};

export default isAuth;
