import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';

function setupSwagger(app: INestApplication<any>): void {
  const config = new DocumentBuilder().build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  const httpAdapter = app.get(HttpAdapterHost) as HttpAdapterHost;
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
