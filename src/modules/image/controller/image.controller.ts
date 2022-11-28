import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@ApiBearerAuth()
@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @ApiOperation({ summary: 'Create image' })
    @Post()
    create(@Body() createImageDto: CreateImageDto) {
        return this.imageService.create(createImageDto);
    }

    @ApiOperation({ summary: 'Get all images' })
    @Get()
    findAll() {
        return this.imageService.findAll();
    }

    @ApiOperation({ summary: 'Get image by id' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imageService.findOne(+id);
    }

    @ApiOperation({ summary: 'Update image by id' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
        return this.imageService.update(+id, updateImageDto);
    }

    @ApiOperation({ summary: 'Delete image by id' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imageService.remove(+id);
    }
}
