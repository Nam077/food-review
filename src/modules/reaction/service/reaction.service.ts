import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UpdateReactionDto } from '../dto/update-reaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reaction } from '../entities/reaction.entity';

@Injectable()
export class ReactionService {
    constructor(@InjectModel(Reaction) private reactionRepository: typeof Reaction) {}

    async create(createReactionDto: CreateReactionDto): Promise<Reaction> {
        if (await this.checkReaction(createReactionDto.idPost, createReactionDto.idUser)) {
            throw new HttpException('User already reacted', HttpStatus.BAD_REQUEST);
        }
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

    async checkReaction(idPost: number, idUser: number): Promise<Reaction> {
        return await this.reactionRepository.findOne({ where: { idPost, idUser } });
    }

    async findReactionByPostAndUser(idPost: number, userId: number) {
        return await this.reactionRepository.findOne({ where: { idPost, idUser: userId } });
    }

    async checkReactionsByPost(idPost: number, updateReactionDto: UpdateReactionDto, userId: number) {
        const reactions: Reaction = await this.findReactionByPostAndUser(idPost, userId);
        if (updateReactionDto.type) {
            reactions.type = updateReactionDto.type;
            await reactions.save();
        } else await this.remove(reactions.id);
    }
}
