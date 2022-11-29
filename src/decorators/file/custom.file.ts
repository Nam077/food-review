import { ApiBody } from '@nestjs/swagger';

export const ApiFile =
    (options: { name: string; required: boolean }) => (target: any, key: string, descriptor: PropertyDescriptor) => {
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    [options.name]: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
            required: options.required,
        })(target, key, descriptor);
    };
export const ApiMultiFile =
    (options: { name: string; required: boolean }) => (target: any, key: string, descriptor: PropertyDescriptor) => {
        ApiBody({
            schema: {
                type: 'object',
                properties: {
                    [options.name]: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
            required: options.required,
        })(target, key, descriptor);
    };
