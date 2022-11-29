import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionService } from '../service/reaction.service';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UpdateReactionDto } from '../dto/update-reaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../../../decorators/auth/custom.auth';

@ApiBearerAuth()
@ApiTags('Reaction')
@Controller('reaction')
export class ReactionController {
    constructor(private readonly reactionService: ReactionService) {}

    @Post()
    @ApiOperation({ summary: 'Create reaction' })
    create(@Body() createReactionDto: CreateReactionDto) {
        return this.reactionService.create(createReactionDto);
    }

    @Post('/post/:idPost')
    @ApiOperation({ summary: 'Get reactions by post' })
    checkReactionsByPost(
        @Param('idPost') idPost: string,
        @GetCurrentUserId() userId: number,
        @Body() updateReactionDto: UpdateReactionDto,
    ) {
        updateReactionDto.idUser = userId;

        return this.reactionService.checkReactionsByPost(+idPost, updateReactionDto, userId);
    }

    @Post('/user/create/:idPost')
    @ApiOperation({ summary: 'Create reaction by user' })
    createReactionByUser(
        @Param('idPost') idPost: string,
        @GetCurrentUserId() userId: number,
        @Body() createReactionDto: CreateReactionDto,
    ) {
        createReactionDto.idUser = userId;
        createReactionDto.idPost = +idPost;
        return this.reactionService.create(createReactionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reactions' })
    findAll() {
        return this.reactionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get reaction by id' })
    findOne(@Param('id') id: string) {
        return this.reactionService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update reaction by id' })
    update(@Param('id') id: string, @Body() updateReactionDto: UpdateReactionDto) {
        return this.reactionService.update(+id, updateReactionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete reaction by id' })
    remove(@Param('id') id: string) {
        return this.reactionService.remove(+id);
    }
}
