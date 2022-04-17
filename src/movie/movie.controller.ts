import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FindMovieDto } from './dto/find-movie.dto';
import ServiceResponse from '../lib/serviceResponse.lib';

@ApiTags("Movie API")
@Controller('api/v1/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async create(@Res() response, @Body() createMovieDto: CreateMovieDto, @UploadedFile() cover: Express.Multer.File) {
    if(!cover) return response.status(HttpStatus.BAD_REQUEST).json(new ServiceResponse().badRequest());

    createMovieDto.cover = cover.path.replace(/\\/g, "/").replace("public/", "");
    
    const result = await this.movieService.create(createMovieDto);
    return response.status(result.code).json(result);
  }

  @Get()
  findAll(@Res() response) {
    const result = this.movieService.findAll();
    return response.status(result.code).json(result);
  }

  @Get(':id')
  findOne(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindMovieDto) {
    const result = this.movieService.findOne(+params.id);
    return response.status(result.code).json(result);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('cover'))
  async update(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindMovieDto, @Body() updateMovieDto: UpdateMovieDto, @UploadedFile() cover: Express.Multer.File) {
    if(cover) {
      updateMovieDto.cover =  cover.path.replace(/\\/g, "/").replace("public/", "");
    }
    const result = await this.movieService.update(+params.id, updateMovieDto);
    return response.status(result.code).json(result);
  }

  @Delete(':id')
  async remove(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindMovieDto) {
    const result = await this.movieService.remove(+params.id);
    return response.status(result.code).json(result);
  }
}
