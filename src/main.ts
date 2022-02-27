import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Pet-Todo')
    .setDescription('Documentation for pet-todo project')
    .setVersion('1.0.0')
    .addTag('Romankin Nikita')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`server has been started on port - ${PORT}`),
  );
};

start();
