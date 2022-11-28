import { Module } from '@nestjs/common';
import { ReactionController } from './controller/reaction.controller';
import { ReactionService } from './service/reaction.service';
import { Reaction } from './entities/reaction.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Reaction])],
    controllers: [ReactionController],
    providers: [ReactionService],
})
export class ReactionModule {}
