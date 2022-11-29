import { CanActivate, createParamDecorator, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/strategies/at.strategy';
import { AbilityFactory, Action, Subjects } from '../../modules/casl/ability.factory';
import { ForbiddenError, Subject } from '@casl/ability';
import { Reflector } from '@nestjs/core';
import { User } from '../../modules/user/entities/user.entity';

export const IsPublic = () => SetMetadata('isPublic', true);
export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data) {
        return request.user[data];
    }
    return request.user;
});

export const GetCurrentUserId = createParamDecorator((data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
});

export interface RequiredRule {
    action: Action;
    subject: Subjects;
}

export const CheckAbilities = (...abilities: RequiredRule[]) => SetMetadata('abilities', abilities);

export class PoliciesGuard implements CanActivate {
    constructor(private reflector: Reflector, private abilityFactory: AbilityFactory) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        const requiredRules = this.reflector.get<RequiredRule[]>('abilities', context.getHandler());
        if (!requiredRules) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: JwtPayload = request.user as JwtPayload;
        const userFind = await User.findOne({ where: { id: user.sub } });
        const ability = this.abilityFactory.createForUser(userFind);
        for (const requiredRule of requiredRules) {
            if (!ability.can(requiredRule.action, requiredRule.subject)) {
                throw new ForbiddenException();
            }
        }
        return true;
    }
}

export class ReadUserAbility implements RequiredRule {
    action = Action.Read;
    subject = User;
}
