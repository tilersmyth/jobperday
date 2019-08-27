import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { LoginInput, RegisterInput, RefreshTokenInput } from './inputs';
import { UserService } from '../user/user.service';
import { AppLogger } from '../app.logger';
import { JwtDto } from './dto/jwt.dto';
import { createAuthToken, verifyToken } from './jwt';
import { config } from '../../config';
import { ForgotPasswordInput } from './inputs/forgot-password.input';

@Resolver('Auth')
export class AuthResolver {
  private logger = new AppLogger(AuthResolver.name);

  constructor(private readonly userService: UserService) {}

  @Mutation(() => JwtDto)
  async login(@Args('input') input: LoginInput) {
    const user = await this.userService.login(input);
    this.logger.debug(`[login] User ${user.email} logging`);
    return createAuthToken(user);
  }

  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput) {
    const user = await this.userService.create(input);
    this.logger.debug(`[register] User ${user.email} register`);
    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Args('input') input: ForgotPasswordInput) {
    // to do
    return true;
  }

  @Mutation(() => JwtDto)
  async refresh(@Args('input') input: RefreshTokenInput) {
    this.logger.debug(`[refresh] Token ${input.token}`);
    const token = await verifyToken(input.token, config.session.refresh.secret);
    return await createAuthToken({ id: token.id });
  }
}
