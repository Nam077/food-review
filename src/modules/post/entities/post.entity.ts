import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';
import { Image } from '../../image/entities/image.entity';
import { Rate } from '../../rate/entities/rate.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Reaction } from '../../reaction/entities/reaction.entity';

@Table({ tableName: 'posts', timestamps: true, comment: 'posts table', updatedAt: true })
export class Post extends Model<Post> {
    @Column({ primaryKey: true, autoIncrement: true, comment: 'post id' })
    id: number;

    @Column({ comment: 'post title' })
    title: string;

    @Column({ comment: 'post content', type: DataType.TEXT('medium') })
    content: string;

    @Column({ comment: 'post status', defaultValue: true })
    status: boolean;

    @Column({ comment: 'post idUser' })
    idUser: number;

    @Column({ comment: 'post description', type: DataType.TEXT('tiny'), allowNull: true })
    description: string;

    @Column({ comment: 'post image' })
    idImage: number;

    @Column({ comment: 'post slug' })
    slug: string;

    @BelongsTo(() => User, 'idUser')
    user: User;

    @HasMany(() => Comment, 'idPost')
    comments: Comment[];

    @HasMany(() => Reaction, 'idPost')
    reactions: Reaction[];

    @HasMany(() => Rate, 'idPost')
    rates: Rate[];

    @BelongsTo(() => Image, 'idImage')
    image: Image;
}
