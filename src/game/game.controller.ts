import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import ServiceResponse from '../lib/serviceResponse.lib';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { FindGameDto } from './dto/find-game.dto';

@ApiTags("Game API")
@Controller('api/v1/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async create(@Res() response, @Body() createGameDto: CreateGameDto, @UploadedFile() cover: Express.Multer.File) {
    if(!cover) return response.status(HttpStatus.BAD_REQUEST).json(new ServiceResponse().badRequest())

    createGameDto.cover = cover.path.replace(/\\/g, "/").replace("public/", "");

    const result = await this.gameService.create(createGameDto);
    return response.status(result.code).json(result);
  }

  @Get()
  findAll(@Res() response) {
    const result = this.gameService.findAll();
    return response.status(result.code).json(result);
  }

  @Get(':id')
  findOne(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindGameDto) {
    const result = this.gameService.findOne(+params.id);
    return response.status(result.code).json(result);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('cover'))
  async update(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindGameDto, @Body() updateGameDto: UpdateGameDto, @UploadedFile() cover: Express.Multer.File) {
    if(cover) {
      updateGameDto.cover =  cover.path.replace(/\\/g, "/").replace("public/", "");
    }

    const result = await this.gameService.update(+params.id, updateGameDto);
    return response.status(result.code).json(result);
  }

  @Delete(':id')
  remove(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindGameDto) {
    const result = this.gameService.remove(+params.id);
    return response.status(result.code).json(result);
  }
}
