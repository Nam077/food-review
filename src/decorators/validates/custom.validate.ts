import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { User } from '../../modules/user/entities/user.entity';
import { Post } from '../../modules/post/entities/post.entity';
import { Comment } from '../../modules/comment/entities/comment.entity';
import { Image } from '../../modules/image/entities/image.entity';
import { Rate } from '../../modules/rate/entities/rate.entity';
import { Reaction } from '../../modules/reaction/entities/reaction.entity';

// eslint-disable-next-line @typescript-eslint/ban-types

@ValidatorConstraint({ name: 'IdUserExists', async: true })
export class IdUserExistsConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return User.findOne({ where: { id } }).then((user) => {
            return !!user;
        });
    }
}

export function IdUserExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdUserExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IdPostExists', async: true })
export class IdPostExistsConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Post.findOne({ where: { id } }).then((post) => {
            return !!post;
        });
    }
}

export function IdPostExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdPostExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IdCommentExists', async: true })
export class IdCommentExistsConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Comment.findOne({ where: { id } }).then((comment) => {
            return !!comment;
        });
    }
}

export function IdCommentExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdCommentExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IdImageExists', async: true })
export class IdImageExistsConstraint implements ValidatorConstraintInterface {
    validate(id: string) {
        return Image.findOne({ where: { id } }).then((image) => {
            return !!image;
        });
    }
}

export function IdImageExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdImageExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IdRateExists', async: true })
export class IdRateExistsConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Rate.findOne({ where: { id } }).then((rate) => {
            return !!rate;
        });
    }
}

export function IdRateExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdRateExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'IdReactionExists', async: true })
export class IdReactionExistsConstraint implements ValidatorConstraintInterface {
    validate(id: number) {
        return Reaction.findOne({ where: { id } }).then((reaction) => {
            return !!reaction;
        });
    }
}

export function IdReactionExists(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IdReactionExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: 'EmailIsUnique', async: true })
export class EmailIsUniqueConstraint implements ValidatorConstraintInterface {
    validate(email: string) {
        return User.findOne({ where: { email } }).then((user) => {
            return !user;
        });
    }
}

export function EmailIsUnique(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueConstraint,
        });
    };
}
// check if the file is an image
@ValidatorConstraint({ name: 'IsImage', async: true })
export class IsImageConstraint implements ValidatorConstraintInterface {
    validate(file: any) {
        return file.mimetype.startsWith('image/');
    }
}

export function IsImage(validationOptions?: any) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsImageConstraint,
        });
    };
}
