import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UpdateReactionDto } from '../dto/update-reaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reaction } from '../entities/reaction.entity';

@Injectable()
export class ReactionService {
    constructor(@InjectModel(Reaction) private reactionRepository: typeof Reaction) {}

    async create(createReactionDto: CreateReactionDto): Promise<Reaction> {
        return await this.reactionRepository.create(createReactionDto);
    }

    async findAll(): Promise<Reaction[]> {
        return this.reactionRepository.findAll();
    }

    async findOne(id: number): Promise<Reaction> {
        return await this.reactionRepository.findByPk(id);
    }

    async update(id: number, updateReactionDto: UpdateReactionDto) {
        const reaction: Reaction = await this.findOne(id);
        if (!reaction) throw new HttpException('Reaction not found', HttpStatus.NOT_FOUND);
        return await reaction.update(updateReactionDto);
    }

    async remove(id: number): Promise<Reaction> {
        const reaction: Reaction = await this.findOne(id);
        if (!reaction) throw new HttpException('Reaction not found', HttpStatus.NOT_FOUND);
        await this.reactionRepository.destroy({ where: { id } });
        return reaction;
    }
}
