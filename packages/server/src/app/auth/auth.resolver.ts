import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';

import { LoginInput, RegisterInput } from './inputs';
import { UserService } from '../user/user.service';
import { AppLogger } from '../app.logger';
import { ForgotPasswordInput } from './inputs/forgot-password.input';
import { ExpressContext } from '../types/context.interface';
import { UserDto } from '../user/dto/user.dto';

@Resolver('Auth')
export class AuthResolver {
  private logger = new AppLogger(AuthResolver.name);

  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserDto)
  async register(
    @Args('input') input: RegisterInput,
    @Context() ctx: ExpressContext,
  ) {
    const user = await this.userService.create(input, ctx.req);
    this.logger.debug(`[register] User ${user.email} register`);
    return user;
  }

  @Mutation(() => UserDto)
  async login(
    @Args('input') input: LoginInput,
    @Context() ctx: ExpressContext,
  ) {
    const user = await this.userService.login(input, ctx.req);
    this.logger.debug(`[login] User ${user.email} logged in`);
    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx: ExpressContext) {
    const user = await this.userService.logout(ctx);
    this.logger.debug(`[logout] User ${user.email} logged out`);
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    // to do
    return true;
  }
}
