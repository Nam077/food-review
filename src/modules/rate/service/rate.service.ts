import { Injectable } from '@nestjs/common';
import { CreateRateDto } from '../dto/create-rate.dto';
import { UpdateRateDto } from '../dto/update-rate.dto';
import { Rate } from '../entities/rate.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RateService {
    constructor(@InjectModel(Rate) private rateModel: typeof Rate) {}

    async create(createRateDto: CreateRateDto): Promise<Rate> {
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
}
