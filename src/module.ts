import { join } from 'path';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Auth } from './middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
    UserModule,
    MovieModule,
    GameModule
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
