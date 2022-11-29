import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IdPostExists, IdUserExists } from '../../../decorators/validates/custom.validate';
import { TypeReaction } from '../entities/reaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReactionDto {
    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser is required' })
    @IdUserExists({ message: 'IdUser does not exist' })
    idUser?: number;

    @ApiProperty({ description: 'IdPost', example: 1 })
    @IsNumber({}, { message: 'IdPost must be a number' })
    @IsNotEmpty({ message: 'IdPost is required' })
    @IdPostExists({ message: 'IdPost does not exist' })
    idPost: number;

    @ApiProperty({ description: 'Reaction', example: 'like' })
    @IsString({ message: 'TypeReaction must be a string' })
    @IsNotEmpty({ message: 'TypeReaction is required' })
    type: TypeReaction;
}
