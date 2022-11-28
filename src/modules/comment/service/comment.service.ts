import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentRepository.create(createCommentDto);
    }

    async findAll(): Promise<Comment[]> {
        return await this.commentRepository.findAll();
    }

    async findOne(id: number): Promise<Comment> {
        return await this.commentRepository.findByPk(id);
    }

    async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        }
        return await comment.update(updateCommentDto);
    }

    async remove(id: number): Promise<Comment> {
        const comment = await this.findOne(id);
        if (!comment) {
            throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        }
        await comment.destroy();
        return comment;
    }

    async findAllByPostId(id: number): Promise<Comment[]> {
        return await this.commentRepository.findAll({
            where: {
                idPost: id,
            },
        });
    }
}
