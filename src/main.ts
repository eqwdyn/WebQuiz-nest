import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

function validateEnv() {
  const required = [
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
  ] as const;

  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(
        `❌ Missing required env var: ${key}. Check your .env file.`,
      );
    }
  });
}

async function bootstrap() {
  validateEnv();

  const PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('WebQuiz API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
  console.log('Server has started on Port: ', PORT);
}
bootstrap();
