import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
