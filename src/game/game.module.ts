import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MulterConfig } from '../lib/multer.lib';

const multerConfig = new MulterConfig("game");

@Module({
  imports: [
    MulterModule.register({storage: multerConfig.multerStorage, fileFilter: multerConfig.multerFilter}),
  ],
  controllers: [GameController],
  providers: [GameService]
})
export class GameModule {}
