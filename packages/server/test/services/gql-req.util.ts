import request from 'supertest';
import { INestApplication } from '@nestjs/common';

export class GqlReqUtil {
  private accessToken: string = '';

  constructor(private readonly app: INestApplication) {}

  set token(token: string) {
    this.accessToken = token;
  }

  public send(query: string, variables: object = {}): request.Test {
    return request(this.app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        variables,
        query,
      })
      .set('Authorization', `Bearer ${this.accessToken}`);
  }
}
