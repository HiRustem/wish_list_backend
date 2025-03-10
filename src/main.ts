import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(router.stack.map((r: any) => r.route?.path));

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
