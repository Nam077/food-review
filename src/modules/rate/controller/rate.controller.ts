import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RateService } from '../service/rate.service';
import { CreateRateDto } from '../dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../../../decorators/auth/custom.auth';

@ApiTags('Rate')
@ApiBearerAuth()
@Controller('rate')
export class RateController {
    constructor(private readonly rateService: RateService) {}

    @Post()
    @ApiOperation({ summary: 'Create rate' })
    create(@Body() createRateDto: CreateRateDto) {
        return this.rateService.create(createRateDto);
    }

    @Post('/user/create/:idPost')
    @ApiOperation({ summary: 'Create Rate by user' })
    createRateByUser(
        @Param('idPost') idPost: string,
        @GetCurrentUserId() userId: number,
        @Body() createRateDto: CreateRateDto,
    ) {
        createRateDto.idUser = userId;
        createRateDto.idPost = +idPost;
        return this.rateService.create(createRateDto);
    }

    @Post('/post/:idPost')
    @ApiOperation({ summary: 'Get rate by post' })
    checkRateByPost(
        @Param('idPost') idPost: string,
        @GetCurrentUserId() userId: number,
        @Body() updateRateDto: UpdateRateDto,
    ) {
        updateRateDto.idUser = userId;
        return this.rateService.checkRateByPost(+idPost, updateRateDto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all rates' })
    findAll() {
        return this.rateService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get rate by id' })
    findOne(@Param('id') id: string) {
        return this.rateService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update rate by id' })
    update(@Param('id') id: string, @Body() updateRateDto: UpdateRateDto) {
        return this.rateService.update(+id, updateRateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete rate by id' })
    remove(@Param('id') id: string) {
        return this.rateService.remove(+id);
    }
}
