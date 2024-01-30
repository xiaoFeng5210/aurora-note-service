import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      if (result === null) {
        ctx.status = 404;
        return {
          code: 1,
          message: 'Data Not Found',
          data: null
        }
      }
      if (result) {
        return {
          code: 0,
          message: 'OK',
          data: result,
        }
      }
    };
  }

  match(ctx) {
    return ctx.path.indexOf('/api') !== -1;
  }

  static getName(): string {
    return 'formatResponse';
  }
}
