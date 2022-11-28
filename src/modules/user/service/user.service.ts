import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { HashProvider } from '../../../providers/hash.provider';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        if (await this.findUserByEmail(createUserDto.email)) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const password: string = await HashProvider.hashPassword(createUserDto.password);
        return await this.userRepository.create({ ...createUserDto, password });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll({ include: { all: true } });
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findByPk(id, { include: { all: true } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = await this.findOne(id);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if (updateUserDto.password) {
            updateUserDto.password = await HashProvider.hashPassword(updateUserDto.password);
        }
        if (updateUserDto.email) {
            if ((await this.findUserByEmail(updateUserDto.email)) && updateUserDto.email !== user.email) {
                throw new HttpException('Email already in use', HttpStatus.CONFLICT);
            }
        }
        return await user.update(updateUserDto);
    }

    async remove(id: number): Promise<User> {
        const userFind: User = await this.findOne(id);
        if (!userFind) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        await userFind.destroy();
        return userFind;
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async validateUser(email: string): Promise<User> {
        const user: User = await this.findUserByEmail(email);
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }
}
