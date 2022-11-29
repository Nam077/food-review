import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRateDto } from '../dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto';
import { Rate } from '../entities/rate.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RateService {
    constructor(@InjectModel(Rate) private rateModel: typeof Rate) {}

    async create(createRateDto: CreateRateDto): Promise<Rate> {
        if (await this.findRateByPostAndUser(createRateDto.idPost, createRateDto.idUser)) {
            throw new HttpException('User already rated', HttpStatus.BAD_REQUEST);
        }
        return await this.rateModel.create(createRateDto);
    }

    async findAll(): Promise<Rate[]> {
        return this.rateModel.findAll();
    }

    async findOne(id: number): Promise<Rate> {
        return await this.rateModel.findByPk(id);
    }

    async update(id: number, updateRateDto: UpdateRateDto): Promise<Rate> {
        const rate: Rate = await this.findOne(id);
        return await rate.update(updateRateDto);
    }

    async remove(id: number): Promise<Rate> {
        const rate: Rate = await this.findOne(id);
        await rate.destroy();
        return rate;
    }

    async checkRateByPost(idPost: number, updateRateDto: UpdateRateDto, userId: number) {
        const rate: Rate = await this.findRateByPostAndUser(idPost, userId);
        if (!rate) {
            throw new HttpException('Rate not found', HttpStatus.NOT_FOUND);
        }
        if (updateRateDto.type) {
            rate.type = updateRateDto.type;
            return await rate.save();
        } else {
            if (updateRateDto.content) {
                rate.content = updateRateDto.content;
                return await rate.save();
            } else {
                return await rate.destroy();
            }
        }
    }

    async findRateByPostAndUser(idPost: number, userId: number) {
        return await this.rateModel.findOne({ where: { idPost, idUser: userId } });
    }
}
