import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';

@Module({
    imports: [SequelizeModule.forFeature([Post])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
