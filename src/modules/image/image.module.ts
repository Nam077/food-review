import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { ImageService } from './service/image.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './entities/image.entity';

@Module({
    imports: [SequelizeModule.forFeature([Image])],
    controllers: [ImageController],
    providers: [ImageService],
})
export class ImageModule {}
