import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createTodo(
    @Body() dto: CreateTodoDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req,
  ) {
    return this.todoService.createTodo(dto, image, req.user?.id);
  }
}
