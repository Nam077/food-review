import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { IdImageExists, IdUserExists } from '../../../decorators/validates/custom.validate';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ description: 'Content', example: 'Post Test' })
    @IsString({ message: 'Title must be a string' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty({ description: 'Content', example: 'Post Test' })
    @IsString({ message: 'Content must be a string' })
    @IsNotEmpty({ message: 'Content is required' })
    content: string;

    @ApiProperty({ description: 'IdUser', example: 1 })
    @IsNumber({}, { message: 'IdUser must be a number' })
    @IsNotEmpty({ message: 'IdUser is required' })
    @IdUserExists({ message: 'IdUser does not exist' })
    idUser: number;

    @ApiProperty({ description: 'IdImage', example: 1 })
    @IsNumber({}, { message: 'IdImage must be a number' })
    @IsNotEmpty({ message: 'IdImage is required' })
    @IdImageExists({ message: 'IdImage does not exist' })
    idImage: number;

    @ApiProperty({ description: 'Status', example: true })
    @IsNotEmpty({ message: 'Status is required' })
    @Matches(/^(true|false)$/, { message: 'Status is not valid' })
    status: boolean;

    @ApiProperty({ description: 'Description', example: 1 })
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty({ message: 'Description is required' })
    description?: string;
}
