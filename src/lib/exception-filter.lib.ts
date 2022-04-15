import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRespose = exception.getResponse();
    const exceptionResposeObj: any = typeof exceptionRespose === "object" ? exceptionRespose : {message: ["Error"]};

    response
      .status(status)
      .json({
        code: status,
        message: exceptionResposeObj.message[0]
      });
  }
}
