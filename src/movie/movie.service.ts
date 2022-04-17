import { Injectable } from '@nestjs/common';

import Data from '../lib/data.lib';
import BaseService from '../lib/service.lib';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService extends BaseService {
  private data: Data;

  constructor() { 
    super(); 
    this.data = new Data("movie");
  }

  async create(createMovieDto: CreateMovieDto) {
    const result = this.data.addOne({...createMovieDto, rating: +createMovieDto.rating});
    return result ? this.response.success() : this.response.badRequest();
  }

  findAll() {
    const result = this.data.getAll();
    return result ? this.response.successWithData(result) : this.response.badRequest();
  }

  findOne(id: number) {
    const result = this.data.getOne(+id);
    return result ? this.response.successWithData(result) : this.response.badRequest();
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const result = this.data.updateOne(+id, updateMovieDto, "cover");
    return result ? this.response.success() : this.response.badRequest();
  }

  async remove(id: number) {
    const result = await this.data.deleteOne(+id, "cover");
    return result ? this.response.success() : this.response.badRequest();
  }
}
