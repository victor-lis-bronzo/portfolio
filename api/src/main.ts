import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Inicializa o Firebase
  const { initFirebase } = await import('../infra/firebase/admin');
  initFirebase(
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ?? './infra/firebase/service-account.json',
    process.env.FIREBASE_STORAGE_BUCKET ?? 'portfolio-project.appspot.com',
  );

  const NODE_ENV = process.env.NODE_ENV;
  const PORT = process.env.PORT ?? 3333;

  app.use(helmet());

  if (NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('API Portfolio')
      .setDescription('Documentação da API')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  await app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
      console.log(`http://localhost:${PORT}`);
    } else {
      console.log(`Server is running on port ${PORT}`);
    }
  });
}
bootstrap();
