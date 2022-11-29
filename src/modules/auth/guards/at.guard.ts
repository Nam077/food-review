import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Action, Subjects } from '../../casl/ability.factory';

export interface RequiredRule {
    action: Action;
    subject: Subjects;
}

@Injectable()
export class AtGuard extends AuthGuard('at') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}
