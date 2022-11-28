import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity';

@Module({
    imports: [SequelizeModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
