import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { ReactionModule } from './modules/reaction/reaction.module';
import { UserDetailModule } from './modules/user-detail/user-detail.module';
import { RateModule } from './modules/rate/rate.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/user/entities/user.entity';
import { UserDetail } from './modules/user-detail/entities/user-detail.entity';
import { Post } from './modules/post/entities/post.entity';
import { Reaction } from './modules/reaction/entities/reaction.entity';
import { Rate } from './modules/rate/entities/rate.entity';
import { Comment } from './modules/comment/entities/comment.entity';
import { Image } from './modules/image/entities/image.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './modules/auth/guards/at.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        AuthModule,
        UserModule,
        PostModule,
        CommentModule,
        ReactionModule,
        UserDetailModule,
        RateModule,
        ImageModule,
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'food-review',
            models: [User, UserDetail, Post, Comment, Reaction, Rate, Image],
            synchronize: true,
            autoLoadModels: true,
            logging: false,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
        }),
        MulterModule.register({
            dest: './uploads',
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
