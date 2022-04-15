import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("User API")
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Res() response, @Body() loginDto: LoginDto) {
    const result = this.userService.login(loginDto);
    return response.status(result.code).json(result);
  }

  @Post('register')
  async register(@Res() response, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.register(createUserDto);
    return response.status(result.code).json(result);
  }

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return response.status(result.code).json(result);
  }

  @Get()
  findAll(@Res() response) {
    const result = this.userService.findAll();
    return response.status(result.code).json(result);
  }

  @Get(':id')
  findOne(@Res() response, @Param('id') id: string) {
    const result = this.userService.findOne(id);
    return response.status(result.code).json(result);
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(+id, updateUserDto);
    return response.status(result.code).json(result);
  }

  @Delete(':id')
  remove(@Res() response, @Param('id') id: string) {
    const result = this.userService.remove(+id);
    return response.status(result.code).json(result);
  }
}
