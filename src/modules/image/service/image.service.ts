import { HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { Image } from '../entities/image.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as fs from 'fs';

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image) private imageRepository: typeof Image) {}

    async create(createImageDto: CreateImageDto): Promise<Image> {
        return await this.imageRepository.create(createImageDto);
    }

    async findAll(): Promise<Image[]> {
        return this.imageRepository.findAll();
    }

    async findOne(id: number): Promise<Image> {
        return await this.imageRepository.findByPk(id);
    }

    async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
        const image: Image = await this.findOne(id);
        if (!image) throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        if (updateImageDto.url) {
            const path = 'uploads' + image.url;
            fs.unlinkSync(path);
        }
        return await image.update(updateImageDto);
    }

    async remove(id: number): Promise<Image> {
        const image: Image = await this.findOne(id);
        if (!image) throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
        // await this.imageRepository.destroy({ where: { id } });
        const path = 'uploads' + image.url;
        fs.unlinkSync(path);
        console.log(path);
        return image;
    }

    uploadFile(file: Express.Multer.File, type: string, idUser: number) {
        const filePath = file.path.replace(/\\/g, '/').replace('uploads', '');
        const createImageDto: CreateImageDto = {
            name: file.filename,
            url: filePath,
            idUser: idUser,
        };
        return this.create(createImageDto);
    }
}
