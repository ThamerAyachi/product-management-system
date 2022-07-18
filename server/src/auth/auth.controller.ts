import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginUserDto } from './dto/LoginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginUserDto) {
    const username = loginUserDto.username;
    const user = await this.usersService.findOne({ username: username });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!(await comparePassword(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('invalid credentials');
    }

    delete user.password, delete user.fullName;

    const token = await this.jwtService.signAsync({
      id: user.id,
      username: user.username,
    });

    return {
      massage: 'Login Succuss!',
      status: HttpStatus.CREATED,
      token: token,
    };
  }
}
