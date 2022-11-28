import { Module } from '@nestjs/common';
import { UserDetailController } from './controller/user-detail.controller';
import { UserDetailService } from './service/user-detail.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDetail } from './entities/user-detail.entity';

@Module({
    imports: [SequelizeModule.forFeature([UserDetail])],
    controllers: [UserDetailController],
    providers: [UserDetailService],
})
export class UserDetailModule {}
