import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/strategies/at.strategy';

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
