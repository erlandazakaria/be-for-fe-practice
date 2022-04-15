import { Controller, Get } from '@nestjs/common';
import BaseService from './lib/service.lib';

@Controller()
export class AppController extends BaseService {
  constructor() { super(); }

  @Get()
  getHello() {
    return this.response.success("Hello from the otherside");
  }
}
