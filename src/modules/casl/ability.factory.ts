import { Injectable } from '@nestjs/common';
import { User } from '../../modules/user/entities/user.entity';
import { Post } from '../../modules/post/entities/post.entity';
import { Reaction } from '../../modules/reaction/entities/reaction.entity';
import { Image } from '../../modules/image/entities/image.entity';
import { Rate } from '../../modules/rate/entities/rate.entity';
import { UserDetail } from '../../modules/user-detail/entities/user-detail.entity';
import { Comment } from '../../modules/comment/entities/comment.entity';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects =
    | InferSubjects<
          typeof Post | typeof User | typeof Comment | typeof Reaction | typeof Rate | typeof Image | typeof UserDetail
      >
    | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (user.role === 'admin') {
            can(Action.Manage, 'all');
        }
        if (user.role === 'user') {
            can(Action.Read, Comment);
            can(Action.Read, Post);
            can(Action.Read, User, { id: user.id });
            can(Action.Read, UserDetail, { id: user.id });
            can(Action.Read, Image);
        }
        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
