import { join } from 'path';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { multerFilter, multerStorage } from './lib/multer.lib';
import { UserModule } from './user/user.module';
import { Auth } from './middlewares/auth.middleware';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({storage: multerStorage, fileFilter: multerFilter}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    MovieModule
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Auth)
      .exclude(
        { path: 'api/v1/user/login', method: RequestMethod.POST },
        { path: 'api/v1/user/register', method: RequestMethod.POST },
      )
      .forRoutes(UserController, MovieController)
  }
}
