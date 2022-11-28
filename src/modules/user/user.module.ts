import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
