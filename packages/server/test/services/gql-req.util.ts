import request from 'supertest';
import { INestApplication } from '@nestjs/common';

export class GqlReqUtil {
  private cookie: string[] = [''];

  constructor(private readonly app: INestApplication) {}

  set setCookie(cookie: string[]) {
    this.cookie = cookie;
  }

  public send(query: string, variables: object = {}): request.Test {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .set('Cookie', this.cookie)
      .send({
        variables,
        query,
      });
  }
}
