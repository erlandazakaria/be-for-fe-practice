import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import Data from '../lib/data.lib';
import BaseService from '../lib/service.lib';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService {
  private data: Data;
  constructor(private jwtService: JwtService) { 
    super(); 
    this.data = new Data("user");
  }

  login(loginDto: LoginDto) {
    if(!loginDto.email) return this.response.error(HttpStatus.BAD_REQUEST, 'Email cant be empty!');
    if(!loginDto.password) return this.response.error(HttpStatus.BAD_REQUEST, 'Password cant be empty!');

    const result = this.data.findByKey("email", loginDto.email);
    if (result) {
      const { password } = result;
      if (bcrypt.compare(loginDto.password, password)) {
        const payload = { id: result.id, email: result.email };
        return this.response.successWithData({token: this.jwtService.sign(payload)})
      }
      return this.response.error(HttpStatus.BAD_GATEWAY, "Password Salah")
    }
    return this.response.error(HttpStatus.BAD_GATEWAY, "Email belum terdaftar")
  }

  async register(createUserDto: CreateUserDto) {
    
    const findDuplicate = this.data.findByKey("email", createUserDto.email);
    if(findDuplicate) return this.response.error(HttpStatus.BAD_REQUEST, "Email telah terdaftar");

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = new CreateUserDto();
    Object.keys(createUserDto).forEach( key => {
      newUser[key] = createUserDto[key];
    })
    newUser.password = hash;

    const result = this.data.addOne(newUser);
    return result ? this.response.success() : this.response.badRequest();
  }

  async create(createUserDto: CreateUserDto) {
    const findDuplicate = this.data.findByKey("email", createUserDto.email);
    if(findDuplicate) return this.response.error(HttpStatus.BAD_REQUEST, "Email telah terdaftar");

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = new CreateUserDto();
    Object.keys(createUserDto).forEach( key => {
      newUser[key] = createUserDto[key];
    })
    newUser.password = hash;

    const result = this.data.addOne(newUser);
    return result ? this.response.success() : this.response.badRequest();
  }

  findAll() {
    const result = this.data.getAll();
    return result ? this.response.successWithData(result) : this.response.badRequest();
  }

  findOne(id: number) {
    const result = this.data.getOne(id);
    return result ? this.response.successWithData(result) : this.response.badRequest();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const newUser = new UpdateUserDto();
    Object.keys(updateUserDto).forEach( key => {
      newUser[key] = updateUserDto[key];
    })
    if(newUser.password) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash
    }

    const result = this.data.updateOne(+id, newUser);
    return result ? this.response.success() : this.response.badRequest();
  }

  remove(id: number) {
    const result = this.data.deleteOne(+id);
    return result ? this.response.success() : this.response.badRequest();
  }
}
