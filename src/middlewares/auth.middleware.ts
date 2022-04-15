import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user/user.service';
import ServiceResponse from "../lib/serviceResponse.lib";

interface UserRequest extends Request {
  user: any
}

@Injectable()
export class Auth implements NestMiddleware {
  constructor(
    private readonly jwt: JwtService, 
    private readonly userService: UserService,
  ) { }

  async use(req: UserRequest, res: Response, next: NextFunction) {
    try{
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.jwt.verify(token);
        const user = await this.userService.findOne(decoded._id);
        if (user) {
          req.user = user
          next()
        } else {
          const result = new ServiceResponse().unathorized();
          res.status(result.code).json(result);
        }
      } else {
          const result = new ServiceResponse().unathorized();
          res.status(result.code).json(result);
      }
    } catch {
      const result = new ServiceResponse().unathorized();
      res.status(result.code).json(result);
    }
  }
}