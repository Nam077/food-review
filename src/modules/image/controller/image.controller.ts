import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFile,
    Query,
    UseInterceptors,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { ImageService } from '../service/image.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from '../dto/file-upload.dto';
import { GetCurrentUserId, IsPublic } from '../../../decorators/auth/custom.auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { request } from 'express';

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

    @ApiQuery({ name: 'type', required: true, enum: ['avatar', 'post', 'comment'] })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload image',
        type: FileUploadDto,
        enum: ['image/jpeg', 'image/png', 'image/gif'],
    })
    @UseInterceptors(
        FileInterceptor('file', {
            limits: {
                fileSize: 1024 * 1024 * 5,
            },
            storage: diskStorage({
                destination: (req, file, cb) => {
                    cb(null, `./uploads/images/${req.query.type}s`);
                },
                filename: (req, file, cb) => {
                    const filename = file.originalname.split('.');
                    const extension = filename[filename.length - 1];
                    cb(null, `${Date.now()}.${extension}`);
                },
            }),
            fileFilter(
                req: any,
                file: {
                    fieldname: string;
                    originalname: string;
                    encoding: string;
                    mimetype: string;
                    size: number;
                    destination: string;
                    filename: string;
                    path: string;
                    buffer: Buffer;
                },
                callback: (error: Error | null, acceptFile: boolean) => void,
            ) {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
                }
                if (file.size > 1024 * 1024 * 5) {
                    return callback(new HttpException('File size is too large!', HttpStatus.BAD_REQUEST), false);
                }
                callback(null, true);
            },
        }),
    )
    @Post('upload')
    @ApiOperation({ summary: 'Upload image' })
    uploadFile(
        @Query('type') type: string,
        @UploadedFile() file: Express.Multer.File,
        @GetCurrentUserId() idUser: number,
    ) {
        return this.imageService.uploadFile(file, type, idUser);
    }
}
