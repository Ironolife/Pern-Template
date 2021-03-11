import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import AppContext from '../../@types/AppContext';
import User from '../../entities/User';
import isAuth from '../../middleware/isAuth';

@Resolver(User)
class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { user_id }: AppContext): Promise<User | undefined> {
    return User.findOne(user_id);
  }
}

export default UserResolver;
