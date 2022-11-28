import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // validate with pipe validation
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setTitle('Food Review')
        .setDescription('The Food Review API description')
        .setVersion('1.0')
        .addTag('food-review')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(3000);

    console.log(`Application is running on: ${await app.getUrl()}`);
    //log api
    console.log(`Swagger is running on http://localhost:3000/api`);
}

bootstrap();
