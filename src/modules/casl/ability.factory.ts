import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from '@casl/ability';
import { User } from '../../modules/user/entities/user.entity';
import { Post } from '../../modules/post/entities/post.entity';
import { Reaction } from '../../modules/reaction/entities/reaction.entity';
import { Image } from '../../modules/image/entities/image.entity';
import { Rate } from '../../modules/rate/entities/rate.entity';
import { UserDetail } from '../../modules/user-detail/entities/user-detail.entity';
import { Comment } from '../../modules/comment/entities/comment.entity';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects =
    | InferSubjects<
          typeof Post | typeof User | typeof Comment | typeof Reaction | typeof Rate | typeof Image | typeof UserDetail
      >
    | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
            Ability as AbilityClass<AppAbility>,
        );

        if (user.role === 'admin') {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all');
            can(Action.Create, Comment);
            can(Action.Create, Reaction);
            can(Action.Create, Rate);
            can(Action.Create, Image);
            can(Action.Update, UserDetail);
            can(Action.Update, User);
            can(Action.Update, Post);
            can(Action.Update, Comment);
            can(Action.Update, Reaction);
            can(Action.Update, Rate);
            can(Action.Update, Image);
            can(Action.Delete, Comment);
            can(Action.Delete, Reaction);
            can(Action.Delete, Rate);
            can(Action.Delete, Image);
            cannot(Action.Delete, User);
            cannot(Action.Delete, Post);
            cannot(Action.Delete, UserDetail);
        }

        can(Action.Update, Post, { idUser: user.id });
        cannot(Action.Delete, Post, { idUser: user.id });
        can(Action.Update, Comment, { idUser: user.id });
        can(Action.Delete, Comment, { idUser: user.id });
        can(Action.Update, Reaction, { idUser: user.id });
        can(Action.Delete, Reaction, { idUser: user.id });
        can(Action.Update, Rate, { idUser: user.id });
        can(Action.Delete, Rate, { idUser: user.id });
        can(Action.Update, Image, { idUser: user.id });
        can(Action.Delete, Image, { idUser: user.id });
        can(Action.Update, UserDetail, { idUser: user.id });
        can(Action.Update, User, { id: user.id });

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
