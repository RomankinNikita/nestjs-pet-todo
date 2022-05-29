import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = this.roleRepository.create(dto);
    return role;
  }

  async getRoles() {
    const roles = this.roleRepository.findAll({
      attributes: ['id', 'value', 'description'],
    });
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = this.roleRepository.findOne({
      where: {
        value: {
          [Op.iLike]: value,
        },
      },
    });
    return role;
  }
}
