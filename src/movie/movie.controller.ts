import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindMovieDto } from './dto/find-movie.dto';

@ApiTags("Movie API")
@Controller('api/v1/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Res() response, @Body() createMovieDto: CreateMovieDto) {
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
  async update(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindMovieDto, @Body() updateMovieDto: UpdateMovieDto) {
    const result = await this.movieService.update(+params.id, updateMovieDto);
    return response.status(result.code).json(result);
  }

  @Delete(':id')
  remove(@Res() response, @Param(new ValidationPipe({transform: true})) params: FindMovieDto) {
    const result = this.movieService.remove(+params.id);
    return response.status(result.code).json(result);
  }
}
