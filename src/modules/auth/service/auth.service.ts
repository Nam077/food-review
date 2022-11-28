import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { JwtPayload } from '../strategies/at.strategy';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(loginDto: LoginDto) {
        const user: User = await this.checkLogin(loginDto);
        const accessToken: string = await this.getAccessToken(user);
        return { accessToken };
    }

    async register(registerDto: RegisterDto) {
        const user: User = await this.registerUser(registerDto);
        const accessToken: string = await this.getAccessToken(user);
        return { accessToken };
    }

    async logout() {
        return 'logout';
    }

    async validateUser(payload: JwtPayload) {
        if (await this.userService.validateUser(payload.email)) {
            return payload;
        } else throw new ForbiddenException('Invalid token');
    }

    async getAccessToken(user: User): Promise<string> {
        return this.jwtService.sign({ email: user.email, sub: user.id }, { secret: 'at-secret', expiresIn: '1h' });
    }

    async checkLogin(loginDto: LoginDto): Promise<User> {
        const user: User = await this.userService.findUserByEmail(loginDto.email);
        if (!user) throw new ForbiddenException('Invalid email or password');
        return user;
    }

    async registerUser(registerDto: RegisterDto): Promise<User> {
        const userCreated: CreateUserDto = {
            email: registerDto.email,
            password: registerDto.password,
            name: registerDto.name,
            role: 'user',
        };
        return await this.userService.create(userCreated);
    }
}
