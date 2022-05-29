import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/user.model';
import { TodoModel } from './todos.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [
    SequelizeModule.forFeature([UserModel, TodoModel]),
    FilesModule,
    AuthModule,
  ],
})
export class TodosModule {}
