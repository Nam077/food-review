import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @ApiOperation({ summary: 'Create comment' })
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @ApiOperation({ summary: 'Get all comments' })
    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @ApiOperation({ summary: 'Get all comments by post id' })
    @Get('post/:id')
    findAllByPostId(@Param('id') id: string) {
        return this.commentService.findAllByPostId(+id);
    }

    @ApiOperation({ summary: 'Get comment by id' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update comment by id' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(+id, updateCommentDto);
    }

    @ApiOperation({ summary: 'Delete comment by id' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}
