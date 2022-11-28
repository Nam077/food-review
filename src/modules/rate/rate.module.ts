import { Module } from '@nestjs/common';
import { RateController } from './controller/rate.controller';
import { RateService } from './service/rate.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rate } from './entities/rate.entity';

@Module({
    imports: [SequelizeModule.forFeature([Rate])],
    controllers: [RateController],
    providers: [RateService],
})
export class RateModule {}
