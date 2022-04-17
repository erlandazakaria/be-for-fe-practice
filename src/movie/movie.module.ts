import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MulterConfig } from '../lib/multer.lib';

const multerConfig = new MulterConfig("movie");

@Module({
  imports: [
    MulterModule.register({storage: multerConfig.multerStorage, fileFilter: multerConfig.multerFilter}),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}
