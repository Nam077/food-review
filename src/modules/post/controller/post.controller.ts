import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../../../decorators/auth/custom.auth';

@ApiBearerAuth()
@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiOperation({ summary: 'Create post' })
    create(@Body() createPostDto: CreatePostDto) {
        return this.postService.create(createPostDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get post by id' })
    findOne(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update post by id' })
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
        return this.postService.update(+id, updatePostDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete post by id' })
    remove(@Param('id') id: string) {
        return this.postService.remove(+id);
    }

    @Post('/user/')
    @ApiOperation({ summary: 'Post by user' })
    postByUser(@Body() createPostDto: CreatePostDto, @GetCurrentUserId() userId: number) {
        createPostDto.idUser = userId;
        return this.postService.create(createPostDto);
    }
}
