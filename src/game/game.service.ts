import { Injectable } from '@nestjs/common';
import Data from '../lib/data.lib';
import BaseService from '../lib/service.lib';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService extends BaseService {
  private data: Data;

  constructor() { 
    super(); 
    this.data = new Data("game");
  }

  async create(createGameDto: CreateGameDto) {
    const result = this.data.addOne({...createGameDto, rating: +createGameDto.rating});
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

  async update(id: number, updateGameDto: UpdateGameDto) {
    const result = this.data.updateOne(+id, updateGameDto);
    return result ? this.response.success() : this.response.badRequest();
  }

  remove(id: number) {
    const result = this.data.deleteOne(+id);
    return result ? this.response.success() : this.response.badRequest();
  }
}
