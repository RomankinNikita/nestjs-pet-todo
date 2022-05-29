import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoModel } from './todos.model';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoModel) private todoRepository: typeof TodoModel,
    private fileService: FilesService,
  ) {}

  async createTodo(
    dto: CreateTodoDto,
    image: Express.Multer.File,
    userId: number,
  ) {
    if (!userId) {
      throw new HttpException(
        'User id is required',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    const fileName = await this.fileService.createFile(image);
    const todo = this.todoRepository.create({
      content: dto.content,
      userId,
      image: fileName,
    });
    return todo;
  }
}
