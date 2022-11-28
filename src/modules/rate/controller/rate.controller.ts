import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RateService } from '../service/rate.service';
import { CreateRateDto } from '../dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
