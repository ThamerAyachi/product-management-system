import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm/User';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { SerializedUser } from './SerializedUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const password = await encodePassword(createUserDto.password);
    const newUser = this.usersRepository.create({ ...createUserDto, password });

    return this.usersRepository.save(newUser);
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users.map((user) => new SerializedUser(user));
  }

  async findOne(condition: any) {
    const user = await this.usersRepository.findOneBy(condition);

    return user;
  }
}
