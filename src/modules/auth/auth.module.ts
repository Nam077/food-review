import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserService } from '../user/service/user.service';
import { User } from '../user/entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';

@Module({
    imports: [SequelizeModule.forFeature([User]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserService, AtStrategy],
})
export class AuthModule {}
