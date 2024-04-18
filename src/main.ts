import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors';

function setupSwagger(app: INestApplication<any>): void {
  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        name: 'Authorization',
        scheme: 'Bearer',
        in: 'Header',
        type: 'http',
      },
      'accessToken',
    )
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_, methodKey) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  setupSwagger(app);

  const httpAdapter = app.get(HttpAdapterHost) as HttpAdapterHost;
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
