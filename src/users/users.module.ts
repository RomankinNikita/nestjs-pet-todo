import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModel } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRolesModel } from 'src/roles/user-roles.model';
import { UserModel } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([UserModel, RoleModel, UserRolesModel]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
