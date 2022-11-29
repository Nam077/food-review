import { Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';

@Module({
    imports: [AbilityFactory],
    exports: [AbilityFactory],
})
export class CaslModule {}
