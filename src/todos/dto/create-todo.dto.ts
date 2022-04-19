import { IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'Should be string' })
  readonly content: string;
}
