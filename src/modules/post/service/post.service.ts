import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post) private postModel: typeof Post) {}

    async create(createPostDto: CreatePostDto): Promise<Post> {
        return await this.postModel.create(createPostDto);
    }

    async findAll(): Promise<Post[]> {
        return await this.postModel.findAll({ include: { all: true } });
    }

    async findOne(id: number): Promise<Post> {
        return await this.postModel.findByPk(id, { include: { all: true } });
    }

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
        const post: Post = await this.findOne(id);
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return await post.update(updatePostDto);
    }

    async remove(id: number): Promise<Post> {
        const post: Post = await this.findOne(id);
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        await post.destroy();
        return post;
    }
}
