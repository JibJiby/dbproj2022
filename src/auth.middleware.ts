import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    // 로그인 권한이 필요한 라우터 리스트
    const includes = ['staffs', 'staff', 'project'];

    const path: string = req._parsedUrl.pathname;

    if (!includes.includes(path.split('/')[1])) {
      return next();
    }

    if (req.user === undefined) {
      console.log(`NOT LOGINED: ${req.originalUrl}`);
      return res.redirect('/login');
    }

    next();
  }
}
